import { AnkiNote, ankiNoteToCSVRow } from "./note";

export const makeAnkiImportableCSV = (
  notes: AnkiNote[],
  deckName: string,
): string => {
  const header =
    [
      "#separator:tab",
      "#html:true",
      "#guid column:1",
      "#notetype column:2",
      "#deck column:3",
      "#tags column:6",
    ].join("\n") + "\n";
  return (
    header + notes.map((note) => ankiNoteToCSVRow(note, deckName)).join("\n")
  );
};
