import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";

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
  const contentHTML = `${wordOrExpression} ${pronunciation}<br><br>[sound:0.mp3]`;
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
