import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnkiNote } from "@/app/anki/note";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { saveNotesInGivenDeckInStorage } from "@/app/storage";

interface NotesTableProps {
  ankiNotes: AnkiNote[];
  setNotes: (notes: AnkiNote[]) => void;
  deckId: string;
}

export function NotesTable({ ankiNotes, setNotes, deckId }: NotesTableProps) {
  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = ankiNotes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    saveNotesInGivenDeckInStorage(deckId, updatedNotes);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Word or expression</TableHead>
          <TableHead>Definition</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ankiNotes.map((ankiNote) => (
          <TableRow key={ankiNote.id}>
            <TableCell>{ankiNote.wordOrExpression}</TableCell>
            <TableCell>{ankiNote.definition}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() => handleDeleteNote(ankiNote.id)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
