import { AnkiNote } from "../anki/note";

export enum NoteGanarationStatus {
  GenerationNotRequestedYet = "GenerationNotRequestedYet",

  GenerationRunning = "GenerationRunning",

  ShowGenerated = "ShowGenerated",
  EditPreviouslySaved = "EditPreviouslySaved",
}
export interface NoteGenerationState {
  noteGenerationStatus: NoteGanarationStatus;

  wordOrExpression: string | undefined;
  meaning: string | undefined;
  generatedNote: AnkiNote | undefined;
}
