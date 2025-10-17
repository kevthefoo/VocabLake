import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import dictionaryValidator from "@/lib/dictionaryValidator";
import { auth } from "@clerk/nextjs/server";
import { incrementDailyUsageDB } from "@/lib/usageCounter.js";

export async function POST(req) {
  const FEATURE = "generate-report";
  const FREE_LIMIT = 10;
  const { has } = await auth();
  

  const hasStandardPlan = has({ plan: "std" });
  if (hasStandardPlan){
    console.log("User is a standard user")
  }else{
    console.log("User is a free plan user")
  }

  const body = await req.json();
  const queryVocab = body.vocabulary;
  const userId = body.userId;
  const admin_groups =  JSON.parse(process.env.ADMIN_ID_LIST || '[]');

  console.log(admin_groups.includes(userId))
  if (!hasStandardPlan && !(admin_groups.includes(userId))) {
    const { allowed, remaining } = await incrementDailyUsageDB(
      userId,
      FEATURE,
      FREE_LIMIT,
    );
    if (!allowed) {
      return NextResponse.json(
        {
          error: "Daily limit reached",
          remaining: 0,
          limit: FREE_LIMIT,
          upgradeHint: "Upgrade to Pro for higher limits.",
        },
        { status: 429 },
      );
    }
  }

  // Input validation
  if (
    !queryVocab ||
    typeof queryVocab !== "string" ||
    queryVocab.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Please provide a valid vocabulary word" },
      { status: 400 },
    );
  }

  // Step 1: Validate word with Free Dictionary API
  // console.log(`Validating word: ${queryVocab}`);
  // const validation = await dictionaryValidator.validateWord(queryVocab);

  // if (!validation.exists) {
  //   console.log(`Word validation failed: ${validation.error}`);

  //   // Return appropriate error based on validation result
  //   if (validation.shouldRetry) {
  //     return NextResponse.json(
  //       {
  //         error: "Unable to validate word at the moment. Please try again.",
  //         details: validation.error,
  //       },
  //       { status: 503 }, // Service Unavailable
  //     );
  //   } else {
  //     return NextResponse.json(
  //       {
  //         error: validation.error || "Word not found in dictionary",
  //         suggestion:
  //           validation.suggestion || "Please check spelling and try again",
  //       },
  //       { status: 404 },
  //     );
  //   }
  // }

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
