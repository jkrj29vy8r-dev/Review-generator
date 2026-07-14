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

  const { text, targetLanguage, sourceLanguage } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const targetLang = LANGUAGE_MAP[targetLanguage];
  if (!targetLang) {
    return NextResponse.json({ error: "Invalid target language" }, { status: 400 });
  }

  try {
    const sourceName = sourceLanguage && LANGUAGE_MAP[sourceLanguage]
      ? LANGUAGE_MAP[sourceLanguage].nameEn
      : "the source language";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate text accurately and naturally into ${targetLang.nameEn} (${targetLang.name}). Preserve tone, nuance and formatting. Return ONLY the translation — no explanations, no quotes.`,
        },
        {
          role: "user",
          content: `Translate from ${sourceName} to ${targetLang.nameEn}:\n\n${text}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const translation = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      translation,
      sourceText: text,
      targetLanguage,
      targetLanguageName: targetLang.name,
    });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
