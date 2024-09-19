import { AudioDataRequest } from "../audio";
import { Language } from "../language";
import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
  getNormalizedExampleSentenceWithWordUnderscored,
} from "./normalized-example-sentence";
import { v4 as uuid } from "uuid";

const getUniqueMp3Name = () => {
  return `${uuid()}.mp3`;
};

interface AnkiCardSideData {
  contentHTML: string;
  audioData: AudioDataRequest[];
}

export interface AnkiCard {
  front: AnkiCardSideData;
  back: AnkiCardSideData;
}

export function getFrontForClozeSentenceAnkiCard(
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

export function getBackForClozeSentenceAnkiCard(
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

export function getFrontForSimpleTranslationAnkiCard(
  easyDefinition: string,
): AnkiCardSideData {
  return {
    contentHTML: `${easyDefinition}`,
    audioData: [],
  };
}

export function getBackForSimpleTranslationAnkiCard(
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
