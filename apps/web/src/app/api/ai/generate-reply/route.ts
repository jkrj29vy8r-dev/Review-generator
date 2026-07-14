import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TONE_DESCRIPTIONS: Record<string, string> = {
  PROFESIONAL: "profesional și respectuos",
  PRIETENOS: "prietenos, cald și personal",
  ELEGANT: "elegant, rafinat și sofisticat",
  PREMIUM: "premium, de înaltă calitate",
  LUX: "de lux, exclusivist și extrem de rafinat",
  RESTAURANT: "specific unui restaurant, cu accent pe experiența gastronomică",
  HOTEL: "specific unui hotel, axat pe ospitalitate și confort",
  CLINICA: "profesional medical, empatic și riguros",
  AUTO: "specific unui service auto, tehnic dar prietenos",
  SALON: "cald și personal, specific unui salon de înfrumusețare",
  CORPORATE: "formal corporatist și precis",
  RELAXAT: "relaxat, casual și natural",
  AMUZANT: "ușor amuzant și jovial, dar respectuos",
  FORMAL: "extrem de formal și protocolar",
};

const REWRITE_INSTRUCTIONS: Record<string, string> = {
  rewrite: "Rescrie complet, cu o abordare diferită.",
  shorter: "Fă răspunsul mai scurt, maxim 40 de cuvinte.",
  longer: "Extinde răspunsul la 80-100 de cuvinte, cu mai multe detalii.",
  friendlier: "Fă răspunsul mai prietenos și mai personal.",
  professional: "Fă răspunsul mai profesional și mai formal.",
  elegant: "Fă răspunsul mai elegant și mai rafinat.",
  empathetic: "Fă răspunsul mai empatic și mai înțelegător.",
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
    rewriteAction,
    currentText,
  } = await req.json();

  const toneDescription = TONE_DESCRIPTIONS[tone] || "profesional";

  let systemPrompt = `Ești managerul ${businessName}, un/o ${businessType} din ${city}.
Răspunzi la recenzii Google în numele afacerii.
Ton: ${toneDescription}

Reguli STRICTE:
- Maxim 60 de cuvinte (dacă nu se cere altfel)
- Mulțumește pe nume dacă există
- Menționează un detaliu concret din recenzie
- La 1-3 stele: recunoaște problema, explică ce se poate îmbunătăți, invită la contact
- La 4-5 stele: mulțumire caldă, invitație să revină
- Nu promite reduceri sau compensații
- Nu folosi limbaj corporatist sau clișee
- Română perfectă, naturală
- Nu începe cu "Bună ziua" în toate variantele - variază saluturile`;

  let userPrompt: string;

  if (rewriteAction && currentText) {
    const instruction = REWRITE_INSTRUCTIONS[rewriteAction] || "Rescrie.";
    userPrompt = `Rescrie acest răspuns la recenzie: "${currentText}"

Instrucțiune: ${instruction}

Recenzie originală:
Rating: ${rating} stele
Text: "${reviewText}"

Generează o singură variantă rescrisă.`;
  } else {
    userPrompt = `Recenzie:
Autor: ${authorName || "Un client"}
Rating: ${rating} stele
Text: "${reviewText}"

Generează 3 variante DISTINCTE de răspuns.
Formatează exact așa:
VARIANTA 1:
[răspuns]

VARIANTA 2:
[răspuns]

VARIANTA 3:
[răspuns]`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const content = completion.choices[0]?.message?.content || "";

    let variants: string[];

    if (rewriteAction) {
      variants = [content.trim()];
    } else {
      // Parse the 3 variants
      const variantMatches = content.match(/VARIANTA \d+:\s*([\s\S]*?)(?=VARIANTA \d+:|$)/g);

      if (variantMatches && variantMatches.length >= 3) {
        variants = variantMatches.map((v) =>
          v.replace(/VARIANTA \d+:\s*/, "").trim()
        );
      } else {
        // Fallback: split by double newlines
        variants = content
          .split(/\n\n+/)
          .filter((v) => v.trim().length > 20)
          .slice(0, 3);

        if (variants.length < 3) {
          variants = [content.trim()];
        }
      }
    }

    return NextResponse.json({
      variants: variants.slice(0, 3),
      tokensUsed: completion.usage?.total_tokens || 0,
      model: "gpt-4o",
    });
  } catch (error: any) {
    console.error("OpenAI error:", error);

    // Fallback to demo variants if API fails
    const demoVariants = generateDemoVariants(authorName, rating, businessName, toneDescription);
    return NextResponse.json({ variants: demoVariants, demo: true });
  }
}

function generateDemoVariants(
  author: string,
  rating: number,
  business: string,
  tone: string
): string[] {
  const name = author ? `, ${author.split(" ")[0]}` : "";

  if (rating >= 4) {
    return [
      `Mulțumim frumos${name}! Ne bucurăm că v-ați simțit bine la ${business}. Vă așteptăm cu drag să reveniți! 😊`,
      `Vă mulțumim pentru cuvintele frumoase${name}! Feedback-ul dumneavoastră ne motivează să fim mereu la același nivel ridicat de calitate.`,
      `Apreciem enorm că ați luat timp să ne lăsați o recenzie${name}! Este o onoare să avem clienți atât de dragi. Pe curând!`,
    ];
  } else {
    return [
      `Bună ziua${name}! Ne pare sincer rău pentru experiența neplăcută. Luăm feedback-ul în serios și lucrăm la îmbunătățire. Vă rugăm să ne contactați pentru a discuta.`,
      `Mulțumim${name} că ne-ați semnalat problema. Aceasta nu reflectă standardele noastre. Dorim să remediem situația — vă așteptăm să ne contactați direct.`,
      `Ne cerem scuze${name} pentru experiența neplăcută. Feedback-ul dumneavoastră este valoros. Am transmis echipei și luăm măsuri. Sperăm să ne dați o nouă șansă.`,
    ];
  }
}
