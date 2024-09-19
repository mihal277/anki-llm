import { Language } from "@/app/language";
import { AnkiNoteData, AnkiNoteType } from "@/app/anki/note";
import {
  AnkiCard,
  getBackForClozeSentenceAnkiCard,
  getBackForSimpleTranslationAnkiCard,
  getFrontForClozeSentenceAnkiCard,
  getFrontForSimpleTranslationAnkiCard,
} from "./card";

export const getNote = (
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  rawExampleSentence: string,
  deckId: number,
): AnkiNoteData => {
  const card1: AnkiCard = {
    front: getFrontForSimpleTranslationAnkiCard(easyDefinition),
    back: getBackForSimpleTranslationAnkiCard(
      wordOrExpression,
      pronunciation,
      Language.Spanish,
    ),
  };
  const card2: AnkiCard = {
    front: getFrontForClozeSentenceAnkiCard(rawExampleSentence, easyDefinition),
    back: getBackForClozeSentenceAnkiCard(rawExampleSentence, Language.Spanish),
  };
  return {
    note: {
      wordOrExpression: wordOrExpression,
      definition: easyDefinition,
      type: AnkiNoteType.TwoBasicAndReversed,
      ankiDeckId: deckId,
    },
    cards: [card1, card2],
  };
};
