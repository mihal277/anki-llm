import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";

export function getRawWordToPronunciationAndTargetLangDefWithSentenceFront(
  wordOrExpression: string,
  language: Language,
): AnkiCardSideData {
  return {
    contentHTML: `${wordOrExpression}<br><br>[sound:0.mp3]`,
    audioData: [
      {
        language: language,
        content: wordOrExpression,
      },
    ],
  };
}

export function getRawWordToPronunciationAndTargetLangDefWithSentenceBack(
  pronunciation: string,
  easyDefinition: string,
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const contentHTML = `${pronunciation}<br><br>${easyDefinition}<br><br>${normalizedBoldSentence}\
  <br><br>[sound:0.mp3]`;
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
