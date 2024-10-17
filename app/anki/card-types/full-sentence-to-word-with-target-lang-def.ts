import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";
import { getUniqueMp3Name } from "@/app/audio";

export function getFullSentenceToWordWithTargetLangDefFront(
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const mp3FileName = getUniqueMp3Name();
  const contentHTML = `${normalizedBoldSentence}<br><br>[sound:${mp3FileName}]`;
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

export function getFullSentenceToWordWithTargetLangDefBack(
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  language: Language,
): AnkiCardSideData {
  const mp3FileName = getUniqueMp3Name();
  const contentHTML = `${wordOrExpression} [${pronunciation}] \
  <br><br>${easyDefinition}<br><br>[sound:${mp3FileName}]`;
  return {
    contentHTML: contentHTML,
    audioData: [
      {
        mp3Name: mp3FileName,
        language: language,
        content: wordOrExpression,
      },
    ],
  };
}
