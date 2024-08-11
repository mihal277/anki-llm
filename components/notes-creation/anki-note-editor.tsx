import { AnkiNote } from "@/app/anki/note";
import { EditableAnkiNote } from "./editable-anki-note";
import { Button } from "../ui/button";
import { setNotesInGivenDeck } from "@/app/storage";
import { useSearchParams } from "next/navigation";

const saveNote = (
  deckId: string,
  ankiNote: AnkiNote,
  notesInDeck: AnkiNote[],
  setNotesInDeck: (notes: AnkiNote[]) => void,
) => {
  const updatedNotesInDeck = [...notesInDeck, ankiNote];
  setNotesInDeck(updatedNotesInDeck);
  setNotesInGivenDeck(deckId, updatedNotesInDeck);
};

interface AnkiNoteEditorProps {
  ankiNote: AnkiNote;
  notesInDeck: AnkiNote[];
  setNotesInDeck: (notes: AnkiNote[]) => void;
  setGeneratedNote: (note: AnkiNote) => void;
}

export function AnkiNoteEditor({
  ankiNote,
  notesInDeck: otherNotes,
  setNotesInDeck: setOtherNotes,
  setGeneratedNote,
}: AnkiNoteEditorProps) {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId")!!;

  return (
    <div>
      <EditableAnkiNote
        ankiNote={ankiNote}
        setGeneratedNote={setGeneratedNote}
      />
      <Button
        onClick={() => saveNote(deckId, ankiNote, otherNotes, setOtherNotes)}
      >
        Save Note
      </Button>
    </div>
  );
}
