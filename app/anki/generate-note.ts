import { Language } from "@/app/language";
import { AnkiNote } from "@/app/anki/note";
import { getDeckLanguage, getExternalServiceAPIKey } from "../db/queries";
import { ExternalService } from "../db/db";
import { getDifferentKindsOfCards } from "./get-cards-for-note";

const rtrim = (s: string, characters: string) => {
  var end = s.length - 1;
  while (characters.indexOf(s[end]) >= 0) {
    end -= 1;
  }
  return s.substring(0, end + 1);
};

const postprocessPronunciation = (pronunciation: string): string => {
  if (!pronunciation.startsWith("[")) pronunciation = "[" + pronunciation;
  if (!pronunciation.endsWith("]")) pronunciation += "]";

  return pronunciation.replace(/ /g, "\u00A0");
};

const getNote = (
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  rawExampleSentence: string,
  nativeLangWordMeaning: string,
  language: Language,
  deckId: number,
): AnkiNote => {
  return {
    wordOrExpression: wordOrExpression,
    definition: easyDefinition,
    ankiDeckId: deckId,
    cards: getDifferentKindsOfCards(
      wordOrExpression,
      pronunciation,
      easyDefinition,
      rawExampleSentence,
      nativeLangWordMeaning,
      language,
    ),
  };
};

export const generateAnkiNote = async (
  wordOrExpression: string,
  meaning: string,
  deckId: number,
): Promise<AnkiNote> => {
  const deckLanguage = await getDeckLanguage(deckId);
  const response = await fetch("/api/generate_flashcard_data", {
    method: "POST",
    body: JSON.stringify({
      word_or_expression: wordOrExpression,
      meaning: meaning,
      language_str: deckLanguage.valueOf(),
      api_key: await getExternalServiceAPIKey(ExternalService.OpenAI),
    }),
  });
  const responseJson = await response.json();

  if (!response.ok) throw Error("Failed to generate flashcard data");

  const normalizedEasyDefinition = rtrim(responseJson.easy_definition, " .");
  return getNote(
    responseJson.postprocessed_word_or_expression,
    postprocessPronunciation(responseJson.ipa_pronuncation),
    normalizedEasyDefinition,
    responseJson.simple_example_sentence,
    meaning,
    deckLanguage,
    deckId,
  );
};
