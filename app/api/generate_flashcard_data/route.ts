"use server";

import OpenAI from "openai";

import { NextRequest, NextResponse } from "next/server";
import { getLanguage } from "@/app/language";
import {
  easyDefinitionDescription,
  ipaPronunciationDescription,
  getDataForAnkiPrompt,
  simpleExampleSentenceDescription,
} from "./prompts";
import {
  ChatCompletionTool,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";

export async function POST(request: NextRequest) {
  const { word_or_expression, meaning, language_str, api_key } =
    await request.json();
  const language = getLanguage(language_str);

  const messages = [
    {
      role: "user",
      content: getDataForAnkiPrompt({
        language,
        wordOrExpression: word_or_expression as string,
        meaning,
      }),
    },
  ];
  const tools = [
    {
      type: "function",
      function: {
        name: "create_anki_card",
        description: "Creates an Anki card with the provided data.",
        parameters: {
          type: "object",
          properties: {
            ipa_pronuncation: {
              type: "string",
              description: ipaPronunciationDescription,
            },
            easy_definition: {
              type: "string",
              description: easyDefinitionDescription({
                language: language,
              }),
            },
            simple_example_sentence: {
              type: "string",
              description: simpleExampleSentenceDescription({
                language: language,
              }),
            },
          },
          required: [
            "ipa_pronuncation",
            "easy_definition",
            "simple_example_sentence",
          ],
        },
      },
    },
  ];

  const openai = new OpenAI({ apiKey: api_key });
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages as ChatCompletionUserMessageParam[],
    tools: tools as ChatCompletionTool[],
    tool_choice: "auto",
  });
  const responseMessage = response.choices[0].message;

  if (responseMessage.tool_calls) {
    const toolCall = responseMessage.tool_calls[0];
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    return new NextResponse(toolCall.function.arguments, {
      status: 200,
      statusText: "OK",
      headers,
    });
  } else {
    // throw Error("No tool calls found in response.");
  }
}
