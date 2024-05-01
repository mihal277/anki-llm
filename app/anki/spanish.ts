import { Language } from "@/app/language";
import { ClozeSentenceAnkiCard, SimpleTranslationAnkiCard } from "./card";
import { NormalizedExampleSentence } from "@/app/anki/normalized-example-sentence";
import { AnkiNote, AnkiNoteType } from "@/app/anki/note";
import { v4 as uuid } from "uuid";

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

  return new AnkiNote(
    uuid(),
    wordOrExpression,
    easyDefinition,
    AnkiNoteType.TwoBasicAndReversed,
    [card1, card2],
  );
};
