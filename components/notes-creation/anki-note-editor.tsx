import { AnkiNoteData } from "@/app/anki/note";
import { EditableAnkiNote } from "./editable-anki-note";
import { Button } from "../ui/button";
import { NoteGanarationStatus } from "@/app/create-notes/page";
import { saveNewNote } from "@/app/db/queries";

const saveNote = (
  generatedNoteData: AnkiNoteData,
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void,
) => {
  saveNewNote(generatedNoteData);
  setGenerationStatus(NoteGanarationStatus.NotGenerated);
};

interface AnkiNoteEditorProps {
  generatedNoteData: AnkiNoteData;
  setGeneratedNoteData: (generatedNoteData: AnkiNoteData) => void;
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void;
}

export function AnkiNoteEditor({
  generatedNoteData,
  setGeneratedNoteData,
  setGenerationStatus,
}: AnkiNoteEditorProps) {
  return (
    <div>
      <EditableAnkiNote
        ankiNoteData={generatedNoteData}
        setGeneratedNoteData={setGeneratedNoteData}
      />
      <Button onClick={() => saveNote(generatedNoteData, setGenerationStatus)}>
        Save Note
      </Button>
    </div>
  );
}
