import { AudioDataRequest, mapContentToMp3FileName } from "../audio";
import { AnkiCard, AnkiCardSideData, applyUniqueMp3NamesToCards } from "./card";
import { v4 as uuid } from "uuid";

export enum AnkiNoteType {
  Basic = "Basic",
  TwoBasic = "Two Basic",
  ThreeBasic = "Three Basic",
  FourBasic = "Four Basic",
  FiveBasic = "Five Basic",
}

export interface AnkiNote {
  id?: number;
  ankiDeckId: number;
  wordOrExpression: string;
  definition: string;
  cards: AnkiCard[];
}

const getCardsSelectedForExport = (
  ankiNote: AnkiNote,
): (AnkiCard & { selectedForExportAt: Date })[] => {
  return ankiNote.cards.filter(
    (card): card is AnkiCard & { selectedForExportAt: Date } =>
      card.selectedForExportAt !== null,
  );
};

const getAnkiNoteType = (ankiNote: AnkiNote): AnkiNoteType => {
  const noteTypes = Object.values(AnkiNoteType);
  const selectedForExportCardsLen = getCardsSelectedForExport(ankiNote).length;

  if (selectedForExportCardsLen > noteTypes.length)
    throw new Error(
      "Invalid number of cards. A maximum of 5 cards can be exportable",
    );

  return noteTypes[selectedForExportCardsLen - 1] as AnkiNoteType;
};

export function ankiNoteToCSVRow(
  ankiNote: AnkiNote,
  deckName: string,
  maxSelectedCardsPerNote: number,
): string {
  const guid = uuid();
  const noteType = getAnkiNoteType(ankiNote).valueOf();
  const tags = "";

  const cardsSelectedForExport = getCardsSelectedForExport(ankiNote).sort(
    (a, b) => a.selectedForExportAt.getTime() - b.selectedForExportAt.getTime(),
  );
  const cardColumns = cardsSelectedForExport.map(
    (card) => `${card.front.contentHTML}\t${card.back.contentHTML}`,
  );

  const emptyColumnsCount =
    maxSelectedCardsPerNote - cardsSelectedForExport.length;
  const padding = "\t\t".repeat(emptyColumnsCount);

  return [guid, noteType, deckName, tags, ...cardColumns].join("\t") + padding;
}

function getAllAudioDataRequestsOfAnkiNote(
  ankiNote: AnkiNote,
): AudioDataRequest[] {
  return ankiNote.cards
    .map((card) => card.front.audioData.concat(card.back.audioData))
    .reduce((acc, val) => acc.concat(val), []);
}

export function getAllAudioDataRequestsOfAnkiNotes(
  ankiNotes: AnkiNote[],
): AudioDataRequest[] {
  return ankiNotes
    .map((ankiNote) => getAllAudioDataRequestsOfAnkiNote(ankiNote))
    .reduce((acc, val) => acc.concat(val), []);
}

export function postprocessNotesForExport(ankiNotes: AnkiNote[]): {
  posprecessedAnkiNotes: AnkiNote[];
  contentToMp3Name: Record<string, string>;
} {
  const notesWithCardsToExportOnly = ankiNotes.map((note) => {
    return {
      ...note,
      cards: getCardsSelectedForExport(note),
    };
  });
  const allAudioDataRequests = getAllAudioDataRequestsOfAnkiNotes(
    notesWithCardsToExportOnly,
  );
  const uniqueContentToUniqueMp3FileName =
    mapContentToMp3FileName(allAudioDataRequests);
  const notesWithAppliedUniqueMp3Names = notesWithCardsToExportOnly.map(
    (note) => {
      return {
        ...note,
        cards: applyUniqueMp3NamesToCards(
          note.cards,
          uniqueContentToUniqueMp3FileName,
        ),
      };
    },
  );
  return {
    posprecessedAnkiNotes: notesWithAppliedUniqueMp3Names,
    contentToMp3Name: uniqueContentToUniqueMp3FileName,
  };
}
