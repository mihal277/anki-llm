import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";

export function getTargetWordCard2Front(
  wordOrExpression: string,
  pronunciation: string,
  language: Language,
): AnkiCardSideData {
  return {
    contentHTML: `${wordOrExpression} ${pronunciation}<br><br>[sound:0.mp3]`,
    audioData: [
      {
        language: language,
        content: wordOrExpression,
      },
    ],
  };
}

export function getTargetWordCard2Back(
  easyDefinition: string,
  nativeLangWordMeaning: string,
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const contentHTML = `${easyDefinition} (${nativeLangWordMeaning})\
  <br><br>${normalizedBoldSentence}<br><br>[sound:0.mp3]`;
  return {
    contentHTML: contentHTML,
    audioData: [
      {
        language: language,
        content: getNormalizedExampleSentence(rawExampleSentence),
      },
    ],
  };
}
