import { EditableAnkiNote } from "./editable-anki-note";
import { Button } from "../ui/button";
import { NoteGanarationStatus } from "@/app/create-notes/page";
import { saveNewNote } from "@/app/db/queries";
import { AnkiNote } from "@/app/anki/note";

const saveNote = (
  generatedNote: AnkiNote,
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void,
) => {
  saveNewNote(generatedNote);
  setGenerationStatus(NoteGanarationStatus.NotGenerated);
};

interface AnkiNoteEditorProps {
  generatedNote: AnkiNote;
  setGeneratedNote: (generatedNote: AnkiNote) => void;
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void;
}

export function AnkiNoteEditor({
  generatedNote: generatedNote,
  setGeneratedNote: setGeneratedNote,
  setGenerationStatus,
}: AnkiNoteEditorProps) {
  return (
    <div>
      <EditableAnkiNote
        ankiNote={generatedNote}
        setGeneratedNote={setGeneratedNote}
      />
      <Button onClick={() => saveNote(generatedNote, setGenerationStatus)}>
        Save Note
      </Button>
    </div>
  );
}
