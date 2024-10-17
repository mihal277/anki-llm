import { AudioDataRequest } from "../audio";
import { AnkiCard } from "./card";
import { v4 as uuid } from "uuid";

export enum AnkiNoteType {
  Basic = "Basic",
  TwoBasic = "Two Basic Cards",
  ThreeBasic = "Three Basic Cards",
  FourBasic = "Four Basic Cards",
  FiveBasic = "Five Basic Cards",
}

export interface AnkiNote {
  id?: number;
  ankiDeckId: number;
  wordOrExpression: string;
  definition: string;
  cards: AnkiCard[];
}

const getSelectedForExportCards = (ankiNote: AnkiNote): AnkiCard[] => {
  return ankiNote.cards.filter((card) => card.selected_for_export);
};

const getAnkiNoteType = (ankiNote: AnkiNote): AnkiNoteType => {
  const noteTypes = Object.values(AnkiNoteType);
  const selectedForExportCardsLen = getSelectedForExportCards(ankiNote).length;

  if (selectedForExportCardsLen > noteTypes.length)
    throw new Error(
      "Invalid number of cards. A maximum of 5 cards can be exportable",
    );

  return noteTypes[selectedForExportCardsLen - 1] as AnkiNoteType;
};

export function ankiNoteToCSVRow(ankiNote: AnkiNote, deckName: string): string {
  const guid = uuid();
  const noteType = getAnkiNoteType(ankiNote).valueOf();
  const tags = "";

  const cardsSelectedForExport = getSelectedForExportCards(ankiNote);
  const cardColumns = cardsSelectedForExport.map(
    (card) => `${card.front.contentHTML}\t${card.back.contentHTML}`,
  );
  return [guid, noteType, deckName, tags, ...cardColumns].join("\t");
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
