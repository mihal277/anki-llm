import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";

export function getFullSentenceToWordWithTargetLangDefFront(
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const contentHTML = `${normalizedBoldSentence}<br><br>[sound:0.mp3]`;
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

export function getFullSentenceToWordWithTargetLangDefBack(
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  language: Language,
): AnkiCardSideData {
  const contentHTML = `${wordOrExpression} ${pronunciation}\
  <br><br>${easyDefinition}<br><br>[sound:0.mp3]`;
  return {
    contentHTML: contentHTML,
    audioData: [
      {
        language: language,
        content: wordOrExpression,
      },
    ],
  };
}
