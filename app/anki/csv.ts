import { AnkiNote, ankiNoteToCSVRow } from "./note";

export const makeAnkiImportableCSV = (
  ankiNotes: AnkiNote[],
  deckName: string,
): string => {
  const header =
    [
      "#separator:tab",
      "#html:true",
      "#guid column:1",
      "#notetype column:2",
      "#deck column:3",
      "#tags column:4",
    ].join("\n") + "\n";
  const maxSelectedCardsPerNote = Math.max(
    ...ankiNotes.map(
      (n) => n.cards.filter((c) => c.selectedForExportAt !== null).length,
    ),
  );
  return (
    header +
    ankiNotes
      .map((note) => ankiNoteToCSVRow(note, deckName, maxSelectedCardsPerNote))
      .join("\n")
  );
};
