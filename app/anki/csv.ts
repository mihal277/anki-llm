import { AnkiNoteData, ankiNoteToCSVRow as ankiNoteDataToCSVRow } from "./note";

export const makeAnkiImportableCSV = (
  ankiNotesData: AnkiNoteData[],
  deckName: string,
): string => {
  const header =
    [
      "#separator:tab",
      "#html:true",
      "#guid column:1",
      "#notetype column:2",
      "#deck column:3",
      "#tags column:8",
    ].join("\n") + "\n";
  return (
    header +
    ankiNotesData
      .map((noteData) => ankiNoteDataToCSVRow(noteData, deckName))
      .join("\n")
  );
};
