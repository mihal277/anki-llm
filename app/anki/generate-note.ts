import { Language } from "@/app/language";
import { AnkiNote } from "@/app/anki/note";
import { getNote as getSpanishNote } from "@/app/anki/spanish";
import { getExternalServiceAPIKey } from "../db/queries";
import { ExternalService } from "../db/db";
import { pronunciationDictionary } from "elevenlabs/api";

const rtrim = (s: string, characters: string) => {
  var end = s.length - 1;
  while (characters.indexOf(s[end]) >= 0) {
    end -= 1;
  }
  return s.substring(0, end + 1);
};

export const generateAnkiNote = async (
  wordOrExpression: string,
  meaning: string,
  language: Language,
  deckId: number,
): Promise<AnkiNote> => {
  if (language !== Language.Spanish) throw Error("Language not supported");

  const response = await fetch("/api/generate_flashcard_data", {
    method: "POST",
    body: JSON.stringify({
      word_or_expression: wordOrExpression,
      meaning: meaning,
      language_str: language.valueOf(),
      api_key: await getExternalServiceAPIKey(ExternalService.OpenAI),
    }),
  });
  const responseJson = await response.json();

  if (!response.ok) throw Error("Failed to generate flashcard data");

  const normalizedEasyDefinition = rtrim(responseJson.easy_definition, " .");
  const pronunciationWithNonBreakingSpaces =
    responseJson.ipa_pronuncation.replace(/ /g, "\u00A0");
  return getSpanishNote(
    wordOrExpression,
    pronunciationWithNonBreakingSpaces,
    normalizedEasyDefinition,
    responseJson.simple_example_sentence,
    meaning,
    deckId,
  );
};
