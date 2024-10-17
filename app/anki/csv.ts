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
  return (
    header +
    ankiNotes.map((note) => ankiNoteToCSVRow(note, deckName)).join("\n")
  );
};
