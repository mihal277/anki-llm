import { Language } from "@/app/language";
import { AnkiNote, AnkiNoteType } from "@/app/anki/note";
import { v4 as uuid } from "uuid";
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
): AnkiNote => {
  const card1: AnkiCard = {
    front: getFrontForSimpleTranslationAnkiCard(easyDefinition),
    back: getBackForSimpleTranslationAnkiCard(
      easyDefinition,
      pronunciation,
      Language.Spanish,
    ),
  };
  const card2: AnkiCard = {
    front: getFrontForClozeSentenceAnkiCard(rawExampleSentence, easyDefinition),
    back: getBackForClozeSentenceAnkiCard(rawExampleSentence, Language.Spanish),
  };
  return {
    id: uuid(),
    wordOrExpression: wordOrExpression,
    definition: easyDefinition,
    type: AnkiNoteType.TwoBasicAndReversed,
    cards: [card1, card2],
  };
};
