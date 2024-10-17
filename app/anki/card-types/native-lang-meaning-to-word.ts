import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import { getUniqueMp3Name } from "@/app/audio";

export function getNativeLangMeaningToWordFront(
  nativeLangWordMeaning: string,
): AnkiCardSideData {
  return {
    contentHTML: nativeLangWordMeaning,
    audioData: [],
  };
}

export function getNativeLangMeaningToWordBack(
  wordOrExpression: string,
  pronunciation: string,
  language: Language,
): AnkiCardSideData {
  const mp3FileName = getUniqueMp3Name();
  const contentHTML = `${wordOrExpression} [${pronunciation}]<br><br>[sound:${mp3FileName}]`;
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
