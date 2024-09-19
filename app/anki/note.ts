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
  id?: number;
  ankiDeckId: number;
  wordOrExpression: string;
  definition: string;
  type: AnkiNoteType;
}

export interface AnkiNoteData {
  note: AnkiNote;
  cards: AnkiCard[];
}

export function ankiNoteToCSVRow(
  ankiNoteData: AnkiNoteData,
  deckName: string,
): string {
  const guid = uuid();
  const noteType = ankiNoteData.note.type.valueOf();
  const tags = "";

  const cardColumns = ankiNoteData.cards.map(
    (card) => `${card.front.contentHTML}\t${card.back.contentHTML}`,
  );
  return [guid, noteType, deckName, ...cardColumns, tags].join("\t");
}

function getAllAudioDataRequestsOfAnkiNote(
  ankiNoteData: AnkiNoteData,
): AudioDataRequest[] {
  return ankiNoteData.cards
    .map((card) => card.front.audioData.concat(card.back.audioData))
    .reduce((acc, val) => acc.concat(val), []);
}

export function getAllDataRequestsOfAnkiNotes(
  ankiNotesData: AnkiNoteData[],
): AudioDataRequest[] {
  return ankiNotesData
    .map((ankiNoteData) => getAllAudioDataRequestsOfAnkiNote(ankiNoteData))
    .reduce((acc, val) => acc.concat(val), []);
}
