import { Router, Request, Response } from "express";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const router = Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GenerateReplySchema = z.object({
  reviewText: z.string().min(1),
  rating: z.number().min(1).max(5),
  authorName: z.string().optional(),
  businessName: z.string(),
  businessType: z.string(),
  city: z.string().optional(),
  tone: z.string().default("PROFESIONAL"),
  model: z.enum(["gpt-4o", "claude"]).default("gpt-4o"),
  rewriteAction: z.string().optional(),
  currentText: z.string().optional(),
});

const TONE_MAP: Record<string, string> = {
  PROFESIONAL: "profesional și respectuos",
  PRIETENOS: "prietenos, cald și personal",
  ELEGANT: "elegant și rafinat",
  PREMIUM: "premium și exclusivist",
  LUX: "de lux, sofisticat",
  RESTAURANT: "specific restaurantului, gastronomic",
  HOTEL: "hotelier, ospitalier",
  CLINICA: "medical, empatic, precis",
  AUTO: "automotive, tehnic dar prietenos",
  SALON: "salon de înfrumusețare, cald",
  CORPORATE: "corporatist și formal",
  RELAXAT: "relaxat și casual",
  AMUZANT: "jovial dar respectuos",
  FORMAL: "extrem de formal",
};

router.post("/generate-reply", async (req: Request, res: Response) => {
  try {
    const data = GenerateReplySchema.parse(req.body);
    const toneDesc = TONE_MAP[data.tone] || "profesional";

    const systemPrompt = `Ești managerul ${data.businessName}, un/o ${data.businessType}${data.city ? ` din ${data.city}` : ""}.
Răspunzi la recenzii Google în numele afacerii.
Ton: ${toneDesc}

Reguli:
- Maxim 60 cuvinte (dacă nu se cere altfel)
- Mulțumește pe nume dacă există
- Menționează un detaliu concret
- La 1-3 stele: recunoaște, explică, invită la contact
- Nu promite reduceri
- Română perfectă, naturală`;

    let variants: string[];

    if (data.model === "claude") {
      const message = await anthropic.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `${systemPrompt}\n\nRecenzie:\nAutor: ${data.authorName || "Un client"}\nRating: ${data.rating} stele\nText: "${data.reviewText}"\n\nGenerează 3 variante distincte de răspuns:\nVARIANTA 1:\n[răspuns]\n\nVARIANTA 2:\n[răspuns]\n\nVARIANTA 3:\n[răspuns]`,
          },
        ],
      });

      const content = message.content[0].type === "text" ? message.content[0].text : "";
      variants = parseVariants(content);
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Recenzie:\nAutor: ${data.authorName || "Un client"}\nRating: ${data.rating} stele\nText: "${data.reviewText}"\n\nGenerează 3 variante:\nVARIANTA 1:\n[răspuns]\n\nVARIANTA 2:\n[răspuns]\n\nVARIANTA 3:\n[răspuns]`,
          },
        ],
        temperature: 0.8,
        max_tokens: 800,
      });

      const content = completion.choices[0]?.message?.content || "";
      variants = parseVariants(content);
    }

    res.json({ variants, model: data.model });
  } catch (error: any) {
    console.error("AI generate error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/insights", async (req: Request, res: Response) => {
  try {
    const { reviews, businessName } = req.body;

    const reviewsSummary = reviews
      .map((r: any) => `[${r.rating}★] ${r.authorName}: ${r.text}`)
      .join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Ești un analist de business pentru ${businessName}. Analizează recenzii și oferă insights în română.`,
        },
        {
          role: "user",
          content: `Analizează:\n${reviewsSummary}\n\nRăspunde JSON:\n{"mostLiked":[],"mostCriticized":[],"improvements":[],"customerFavorites":[],"strategicRecommendation":""}`,
        },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const insights = JSON.parse(completion.choices[0]?.message?.content || "{}");
    res.json(insights);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sentiment", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Analizează sentimentul acestui text și returnează JSON {"sentiment":"positive|neutral|negative","score":0.0-1.0,"keywords":[]}\n\nText: "${text}"`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

function parseVariants(content: string): string[] {
  const matches = content.match(/VARIANTA \d+:\s*([\s\S]*?)(?=VARIANTA \d+:|$)/g);
  if (matches && matches.length >= 2) {
    return matches.map((v) => v.replace(/VARIANTA \d+:\s*/, "").trim()).slice(0, 3);
  }
  const parts = content.split(/\n\n+/).filter((v) => v.trim().length > 20);
  return parts.slice(0, 3);
}

export { router as aiRoutes };
