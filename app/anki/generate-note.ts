import { Language } from "@/app/language";
import { AnkiNote } from "@/app/anki/note";
import { OPEN_AI_STORAGE_KEY, getFromStorage } from "@/app/storage";
import { getNote as getSpanishNote } from "@/app/anki/spanish";
import { NormalizedExampleSentence } from "@/app/anki/normalized-example-sentence";

export const generateAnkiNote = async (
  wordOrExpression: string,
  meaning: string,
  language: Language,
): Promise<AnkiNote> => {
  if (language !== Language.Spanish) throw Error("Language not supported");

  const response = await fetch("/api/generate_flashcard_data", {
    method: "POST",
    body: JSON.stringify({
      word_or_expression: wordOrExpression,
      meaning: meaning,
      language_str: language.valueOf(),
      api_key: getFromStorage(OPEN_AI_STORAGE_KEY),
    }),
  });
  const responseJson = await response.json();

  if (!response.ok) throw Error("Failed to generate flashcard data");

  return getSpanishNote(
    wordOrExpression,
    responseJson.ipa_pronuncation,
    responseJson.easy_definition,
    new NormalizedExampleSentence(responseJson.simple_example_sentence),
  );
};
