import { AnkiNote } from "@/app/anki/note";
import { EditableAnkiNote } from "./editable-anki-note";
import { Button } from "../ui/button";
import { saveNotesInGivenDeckInStorage } from "@/app/storage";
import { useSearchParams } from "next/navigation";

const saveNote = (
  deckId: string,
  ankiNote: AnkiNote,
  notesInDeck: AnkiNote[],
  setNotesInDeck: (notes: AnkiNote[]) => void,
  setGeneratedNote: (note: AnkiNote | undefined) => void,
) => {
  const updatedNotesInDeck = [...notesInDeck, ankiNote];
  setNotesInDeck(updatedNotesInDeck);
  saveNotesInGivenDeckInStorage(deckId, updatedNotesInDeck);
  setGeneratedNote(undefined);
};

interface AnkiNoteEditorProps {
  ankiNote: AnkiNote;
  notesInDeck: AnkiNote[];
  setNotesInDeck: (notes: AnkiNote[]) => void;
  setGeneratedNote: (note: AnkiNote | undefined) => void;
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
        onClick={() =>
          saveNote(
            deckId,
            ankiNote,
            otherNotes,
            setOtherNotes,
            setGeneratedNote,
          )
        }
      >
        Save Note
      </Button>
    </div>
  );
}
