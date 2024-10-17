import { EditableAnkiNote } from "./editable-anki-note";
import { Button } from "../ui/button";
import { NoteGanarationStatus } from "@/app/create-notes/page";
import { saveNewNote } from "@/app/db/queries";
import { AnkiNote } from "@/app/anki/note";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const saveNote = (
  generatedNote: AnkiNote,
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void,
) => {
  saveNewNote(generatedNote);
  setGenerationStatus(NoteGanarationStatus.NotGenerated);
};

interface AnkiCardsPickerProps {
  generatedNote: AnkiNote;
  setGeneratedNote: (generatedNote: AnkiNote) => void;
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void;
}

export function AnkiCardsPicker({
  generatedNote,
  setGeneratedNote,
  setGenerationStatus,
}: AnkiCardsPickerProps) {
  return (
    <div>
      {/* <EditableAnkiNote
        ankiNote={generatedNote}
        setGeneratedNote={setGeneratedNote}
      /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {generatedNote.cards.map((_, i) => (
          <div key={i}>
            <Card>
              <CardHeader>
                <CardTitle>Car</CardTitle>
                <CardDescription>Card descr</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="pl-4">
        <Button onClick={() => saveNote(generatedNote, setGenerationStatus)}>
          Save Note
        </Button>
      </div>
    </div>
  );
}
