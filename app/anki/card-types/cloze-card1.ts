import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
  getNormalizedExampleSentenceWithWordUnderscored,
} from "../normalized-example-sentence";

export function getClozeCard1Front(
  rawExampleSentence: string,
  easyDefinition: string,
): AnkiCardSideData {
  const underscoredNormalizedSentence =
    getNormalizedExampleSentenceWithWordUnderscored(rawExampleSentence);
  return {
    contentHTML: `${easyDefinition}:<br><br>${underscoredNormalizedSentence}`,
    audioData: [],
  };
}

export function getClozeCard1Back(
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
