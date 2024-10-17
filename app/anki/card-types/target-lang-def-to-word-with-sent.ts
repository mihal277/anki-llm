import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";

export function getTargetLangDefToWordWithSentFront(
  easyDefinition: string,
): AnkiCardSideData {
  return {
    contentHTML: easyDefinition,
    audioData: [],
  };
}

export function getTargetLangDefToWordWithSentBack(
  wordOrExpression: string,
  pronunciation: string,
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const contentHTML = `${wordOrExpression} ${pronunciation}\
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
