import { Language } from "@/app/language";
import { AnkiCardSideData } from "../card";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
  getNormalizedExampleSentenceWithWordUnderscored,
} from "../normalized-example-sentence";
import { getUniqueMp3Name } from "@/app/audio";

export function getClozeSentenceToFullSentenceFront(
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

export function getClozeSentenceToFullSentenceBack(
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
