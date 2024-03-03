import { AnkiNote } from "./note";

export const makeCSVToImportInAnki = (
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
  return header + notes.map((note) => note.toCSVRow(deckName)).join("\n");
};
