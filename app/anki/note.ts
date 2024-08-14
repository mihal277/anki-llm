import { AudioDataRequest } from "../audio";
import { AnkiCard } from "./card";
import { v4 as uuid } from "uuid";

export enum AnkiNoteType {
  Basic = "Basic",
  BasicAndReversed = "Basic (and reversed card)",
  TwoConnectedCards = "2 connected cards",
  TwoBasicAndReversed = "2x basic and reversed",
}

export interface AnkiNote {
  id: string;
  wordOrExpression: string;
  definition: string;
  type: AnkiNoteType;
  cards: AnkiCard[];
}

export function ankiNoteToCSVRow(ankiNote: AnkiNote, deckName: string): string {
  const guid = uuid();
  const noteType = ankiNote.type.valueOf();
  const tags = "";

  const cardColumns = ankiNote.cards.map(
    (card) => `${card.front.contentHTML}\t${card.back.contentHTML}`,
  );
  return [guid, noteType, deckName, ...cardColumns, tags].join("\t");
}

function getAllAudioDataRequestsOfAnkiNote(
  ankiNote: AnkiNote,
): AudioDataRequest[] {
  return ankiNote.cards
    .map((card) => card.front.audioData.concat(card.back.audioData))
    .reduce((acc, val) => acc.concat(val), []);
}

export function getAllDataRequestsOfAnkiNotes(
  ankiNotes: AnkiNote[],
): AudioDataRequest[] {
  return ankiNotes
    .map((ankiNote) => getAllAudioDataRequestsOfAnkiNote(ankiNote))
    .reduce((acc, val) => acc.concat(val), []);
}
