import { Language } from "@/app/language";
import { AnkiNote } from "@/app/anki/note";
import { OPEN_AI_STORAGE_KEY, getFromStorage } from "@/app/storage";
import { getNote as getSpanishNote } from "@/app/anki/spanish";

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

  const normalizedEasyDefinition = rtrim(responseJson.easy_definition, " .");
  return getSpanishNote(
    wordOrExpression,
    responseJson.ipa_pronuncation,
    normalizedEasyDefinition,
    responseJson.simple_example_sentence,
  );
};
