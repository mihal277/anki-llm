import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import { getUniqueMp3Name } from "@/app/audio";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
} from "../normalized-example-sentence";

export function getWordToNativeLangeMeaningWithSentFront(
  wordOrExpression: string,
  pronunciation: string,
  language: Language,
): AnkiCardSideData {
  const mp3FileName = getUniqueMp3Name();
  return {
    contentHTML: `${wordOrExpression} [${pronunciation}]<br><br>[sound:${mp3FileName}]`,
    audioData: [
      {
        mp3Name: mp3FileName,
        language: language,
        content: wordOrExpression,
      },
    ],
  };
}

export function getWordToNativeLangeMeaningWithSentBack(
  nativeLangWordMeaning: string,
  rawExampleSentence: string,
  language: Language,
): AnkiCardSideData {
  const normalizedBoldSentence =
    getNormalizedExampleSentenceWithBoldWord(rawExampleSentence);
  const mp3FileName = getUniqueMp3Name();
  const contentHTML = `${nativeLangWordMeaning}<br><br>${normalizedBoldSentence}<br><br>[sound:${mp3FileName}]`;
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
