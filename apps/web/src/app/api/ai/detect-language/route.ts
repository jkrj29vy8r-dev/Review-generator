import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { LANGUAGE_MAP } from "@/lib/languages";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();
  if (!text?.trim()) {
    return NextResponse.json({ code: "en", confidence: 0 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Detect the language of this text. Return ONLY valid JSON: {"code":"<ISO-639-1 two-letter code>","confidence":<0.0-1.0>}\n\nText: "${text.slice(0, 300)}"`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 20,
      temperature: 0,
    });

    const result = JSON.parse(
      completion.choices[0]?.message?.content || '{"code":"en","confidence":0.5}'
    );
    const code = (result.code || "en").toLowerCase().slice(0, 2);
    const lang = LANGUAGE_MAP[code];

    return NextResponse.json({
      code,
      confidence: result.confidence || 0.9,
      name: lang?.name || code,
      nameEn: lang?.nameEn || code,
      flag: lang?.flag || "🌐",
    });
  } catch {
    return NextResponse.json({ code: "en", confidence: 0.5, name: "English", nameEn: "English", flag: "🇬🇧" });
  }
}
