import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(req) {
  const body = await req.json();
  const queryVocab = body.vocabulary;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });

  const vocabData = z.object({
    vocabulary: z.string(),
    descriptions: z.array(
      z.object({
        meaning: z.string(),
        example: z.string(),
      }),
    ),
  });

  try {
    const response = await client.responses.parse({
      model: "o4-mini-2025-04-16",
      input: [
        {
          role: "system",
          content:
            "Now you are a English vocaulary dictionary, only answer the question about English vocaularies. If the input is not in English, please translate it to English first.",
        },
        {
          role: "user",
          content: `What is the meaning of the word ${queryVocab}?`,
        },
      ],
      text: {
        format: zodTextFormat(vocabData, "ResVocabData"),
      },
    });

    const parsedVocabData = response.output_parsed;

    return NextResponse.json({ result: parsedVocabData }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}
