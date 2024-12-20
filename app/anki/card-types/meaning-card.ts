import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";

export function getMeaningCardFront(
  nativeLangWordMeaning: string,
): AnkiCardSideData {
  return {
    contentHTML: nativeLangWordMeaning,
    audioData: [],
  };
}

export function getMeaningCardBack(
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
