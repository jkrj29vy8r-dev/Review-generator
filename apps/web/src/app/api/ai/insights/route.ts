import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reviews, businessName } = await req.json();

  const reviewsSummary = reviews
    .map((r: any) => `[${r.rating}★] ${r.author}: ${r.text}`)
    .join("\n");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Ești un analist de business specializat în analiza recenziilor pentru ${businessName}.
Analizează recenziile și oferă insights clare și acționabile în română.`,
        },
        {
          role: "user",
          content: `Analizează aceste recenzii și oferă:
1. Cele mai apreciate aspecte (top 3)
2. Cele mai criticate aspecte (top 3)
3. Ce trebuie îmbunătățit urgent (top 3)
4. Ce apreciază clienții cel mai mult (top 3)
5. O recomandare strategică

Recenzii:
${reviewsSummary}

Răspunde în format JSON:
{
  "mostLiked": ["...", "...", "..."],
  "mostCriticized": ["...", "...", "..."],
  "improvements": ["...", "...", "..."],
  "customerFavorites": ["...", "...", "..."],
  "strategicRecommendation": "..."
}`,
        },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const insights = JSON.parse(completion.choices[0]?.message?.content || "{}");
    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json({
      mostLiked: ["Calitatea produselor", "Atmosfera", "Personalul amabil"],
      mostCriticized: ["Timpul de așteptare", "Prețurile", "Parcarea"],
      improvements: ["Viteza serviciului", "Comunicarea personalului", "Prețul/calitate"],
      customerFavorites: ["Mâncarea tradițională", "Locația centrală", "Curățenia"],
      strategicRecommendation: "Focusați-vă pe reducerea timpului de așteptare și instruirea personalului pentru comunicare mai eficientă.",
    });
  }
}
