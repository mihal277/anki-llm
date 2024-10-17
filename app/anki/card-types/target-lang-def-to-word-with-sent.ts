import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import { getUniqueMp3Name } from "@/app/audio";
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
  const mp3FileName = getUniqueMp3Name();
  const contentHTML = `${wordOrExpression} [${pronunciation}] \
  <br><br>${normalizedBoldSentence}<br><br>[sound:${mp3FileName}]`;
  return {
    contentHTML: contentHTML,
    audioData: [
      {
        mp3Name: mp3FileName,
        language: language,
        content: getNormalizedExampleSentence(rawExampleSentence),
      },
    ],
  };
}
