import { Language } from "../language";
import { ClozeSentenceAnkiCard, SimpleTranslationAnkiCard } from "./card";
import { NormalizedExampleSentence } from "./normalizedExampleSentence";
import { AnkiNote, AnkiNoteType } from "./note";

export const getNote = (
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  exampleSentence: NormalizedExampleSentence,
): AnkiNote => {
  const card1 = new SimpleTranslationAnkiCard(
    wordOrExpression,
    pronunciation,
    easyDefinition,
    Language.Spanish,
  );
  const card2 = new ClozeSentenceAnkiCard(
    exampleSentence,
    easyDefinition,
    Language.Spanish,
  );

  return new AnkiNote(AnkiNoteType.TwoBasicAndReversed, [card1, card2]);
};
