import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import { getUniqueMp3Name } from "@/app/audio";

export function getTargetLangDefToWordFront(
  easyDefinition: string,
): AnkiCardSideData {
  return {
    contentHTML: easyDefinition,
    audioData: [],
  };
}

export function getTargetLangDefToWordBack(
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
