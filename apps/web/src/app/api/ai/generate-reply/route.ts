import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { getLanguageInstruction, LANGUAGE_MAP } from "@/lib/languages";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TONE_DESCRIPTIONS: Record<string, string> = {
  PROFESIONAL: "professional and respectful",
  PRIETENOS: "friendly, warm and personal",
  ELEGANT: "elegant, refined and sophisticated",
  PREMIUM: "premium, high-quality",
  LUX: "luxury, exclusive and extremely refined",
  RESTAURANT: "gastronomy-focused, warm and inviting",
  HOTEL: "hospitality-focused, attentive and welcoming",
  CLINICA: "professional, empathetic and precise (medical context)",
  AUTO: "automotive, technical yet friendly",
  SALON: "warm and personal (beauty/wellness salon)",
  CORPORATE: "formal and corporate",
  RELAXAT: "relaxed and casual",
  AMUZANT: "slightly playful and jovial, yet respectful",
  FORMAL: "very formal and protocol-based",
};

const REWRITE_INSTRUCTIONS: Record<string, string> = {
  rewrite: "Rewrite completely with a fresh approach and different phrasing.",
  shorter: "Make the reply shorter — maximum 30 words.",
  longer: "Expand the reply to 80–100 words with more detail.",
  friendlier: "Make the reply warmer and more personal.",
  professional: "Make the reply more professional and formal.",
  elegant: "Make the reply more elegant and refined.",
  empathetic: "Make the reply more empathetic and understanding.",
};

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    reviewText,
    rating,
    authorName,
    businessName,
    businessType,
    city,
    tone,
    languageMode = "auto",   // "auto" | ISO-639-1 code e.g. "en", "de", "ro"
    rewriteAction,
    currentText,
  } = await req.json();

  const toneDescription = TONE_DESCRIPTIONS[tone] || "professional and respectful";
  const languageInstruction = getLanguageInstruction(languageMode);

  // Build the universal system prompt
  const systemPrompt = `You are the manager of ${businessName}, a ${businessType}${city ? ` located in ${city}` : ""}.

LANGUAGE MODE: ${languageInstruction}

TONE: ${toneDescription}

STRICT RULES:
1. Detect the review language automatically UNLESS a language is forced.
2. Reply naturally and fluently in the selected/detected language — never translate awkwardly.
3. Maximum 60 words per reply (unless rewriting with a specific length instruction).
4. Mention the customer's first name if available.
5. Reference at least one specific detail from the review.
6. For ratings 1–3 stars:
   - Acknowledge the issue sincerely.
   - Briefly explain what will be improved.
   - Invite the customer to contact the business directly.
7. For ratings 4–5 stars:
   - Thank warmly and specifically.
   - Invite them to return.
8. NEVER promise refunds, discounts, free products or compensation.
9. Avoid corporate jargon, clichés, and robotic phrasing.
10. Sound human, authentic, and culturally appropriate for the language.
11. Vary sentence structure and salutations across the 3 variants.`;

  let userPrompt: string;

  if (rewriteAction && currentText) {
    const instruction = REWRITE_INSTRUCTIONS[rewriteAction] || "Rewrite with a different approach.";
    userPrompt = `REWRITE this reply to a review:

Current reply: "${currentText}"

Rewrite instruction: ${instruction}

Original review context:
- Rating: ${rating} stars
- Author: ${authorName || "A customer"}
- Review text: "${reviewText}"

LANGUAGE MODE: ${languageInstruction}

Return ONE rewritten reply only.`;
  } else {
    userPrompt = `Review details:
- Author: ${authorName || "A customer"}
- Rating: ${rating} out of 5 stars
- Review text: "${reviewText}"

Generate exactly 3 DISTINCT reply variations.

Use this exact format — no extra text:
VARIANT 1:
[reply text]

VARIANT 2:
[reply text]

VARIANT 3:
[reply text]`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 900,
    });

    const content = completion.choices[0]?.message?.content || "";

    let variants: string[];
    if (rewriteAction) {
      variants = [content.trim()];
    } else {
      variants = parseVariants(content);
    }

    // Detect the actual language used in first variant for UI feedback
    const detectedLanguage = await detectLanguageFromText(
      variants[0] || reviewText
    );

    return NextResponse.json({
      variants: variants.slice(0, 3),
      tokensUsed: completion.usage?.total_tokens || 0,
      model: "gpt-4o",
      detectedLanguage,
      languageMode,
    });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    const fallback = generateFallbackVariants(authorName, rating, languageMode);
    return NextResponse.json({ variants: fallback, demo: true, detectedLanguage: languageMode === "auto" ? "ro" : languageMode });
  }
}

/** Parse VARIANT N: blocks from AI output */
function parseVariants(content: string): string[] {
  // Try "VARIANT N:" pattern first
  const regex = /VARIANT\s+\d+:\s*([\s\S]*?)(?=VARIANT\s+\d+:|$)/gi;
  const matches = [...content.matchAll(regex)];

  if (matches.length >= 2) {
    return matches
      .map((m) => m[1].trim())
      .filter((v) => v.length > 10)
      .slice(0, 3);
  }

  // Fallback: try numbered list
  const numbered = content
    .split(/\n\s*\d+[\.\)]\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (numbered.length >= 2) return numbered.slice(0, 3);

  // Last resort: split by double newlines
  const parts = content
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  return parts.length >= 1 ? parts.slice(0, 3) : [content.trim()];
}

/** Quick language detection using a cheap GPT call */
async function detectLanguageFromText(text: string): Promise<string> {
  try {
    if (!text || text.length < 5) return "en";
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Detect the language of this text and return ONLY the ISO 639-1 two-letter code (e.g. "en", "ro", "de", "fr"). No explanation.\n\nText: "${text.slice(0, 200)}"`,
        },
      ],
      max_tokens: 5,
      temperature: 0,
    });
    const code = res.choices[0]?.message?.content?.trim().toLowerCase().slice(0, 2);
    return code && /^[a-z]{2}$/.test(code) ? code : "en";
  } catch {
    return "en";
  }
}

/** Multilingual fallback variants when API is unavailable */
function generateFallbackVariants(
  author: string,
  rating: number,
  languageMode: string
): string[] {
  const name = author ? `, ${author.split(" ")[0]}` : "";
  const lang = languageMode === "auto" ? "ro" : languageMode;

  const fallbacks: Record<string, [string, string, string]> = {
    ro: rating >= 4
      ? [`Mulțumim${name}! Ne bucurăm că v-ați simțit bine. Vă așteptăm cu drag!`, `Apreciem cuvintele frumoase${name}! Feedbackul vostru ne motivează zilnic.`, `Vă mulțumim${name} pentru recenzie! Pe curând!`]
      : [`Ne pare rău${name} pentru experiența neplăcută. Lucrăm la îmbunătățiri și vă invităm să ne contactați.`, `Mulțumim${name} că ne-ați semnalat problema. Vom lua măsuri imediat.`, `Îmi cer scuze${name}. Feedback-ul dumneavoastră este important. Vă rugăm să ne contactați direct.`],
    en: rating >= 4
      ? [`Thank you${name}! We're so glad you had a great experience. See you soon!`, `We really appreciate your kind words${name}! Feedback like yours keeps us motivated.`, `Thank you for sharing${name}! We look forward to welcoming you back.`]
      : [`We're sorry${name} for the experience. We're taking this seriously and invite you to reach out directly.`, `Thank you${name} for your feedback. We'll address this immediately.`, `We apologize${name}. Please contact us directly so we can make things right.`],
    de: rating >= 4
      ? [`Vielen Dank${name}! Es freut uns, dass Sie einen schönen Aufenthalt hatten. Bis bald!`, `Wir schätzen Ihr nettes Feedback${name}! Das motiviert unser Team sehr.`, `Danke${name} für Ihre Bewertung! Wir freuen uns auf Ihren nächsten Besuch.`]
      : [`Es tut uns leid${name} für Ihre Erfahrung. Wir nehmen das ernst und laden Sie ein, uns direkt zu kontaktieren.`, `Vielen Dank${name} für Ihr Feedback. Wir werden sofort handeln.`, `Wir entschuldigen uns${name}. Bitte kontaktieren Sie uns direkt.`],
    fr: rating >= 4
      ? [`Merci${name} ! Nous sommes ravis que vous ayez passé un bon moment. À bientôt !`, `Nous apprécions vos gentils mots${name} ! Cela motive toute notre équipe.`, `Merci pour votre avis${name} ! Nous espérons vous revoir bientôt.`]
      : [`Nous sommes désolés${name} pour cette expérience. Nous prenons cela au sérieux et vous invitons à nous contacter.`, `Merci${name} pour votre retour. Nous allons agir immédiatement.`, `Nous nous excusons${name}. N'hésitez pas à nous contacter directement.`],
    es: rating >= 4
      ? [`¡Gracias${name}! Nos alegra que haya disfrutado su visita. ¡Hasta pronto!`, `Apreciamos mucho sus palabras${name}. ¡Nos motiva seguir mejorando!`, `Muchas gracias${name} por su reseña. ¡Le esperamos pronto!`]
      : [`Lo sentimos${name} por la experiencia. Tomamos esto en serio y le invitamos a contactarnos directamente.`, `Gracias${name} por su comentario. Actuaremos de inmediato.`, `Pedimos disculpas${name}. Por favor, contáctenos directamente.`],
  };

  const variants = fallbacks[lang] || fallbacks["en"];
  return variants;
}
