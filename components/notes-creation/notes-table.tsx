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
import { useLiveQuery } from "dexie-react-hooks";
import { useSearchParams } from "next/navigation";
import { db } from "@/app/db/db";
import { deleteNote } from "@/app/db/queries";

export function NotesTable() {
  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);
  const ankiNotes = useLiveQuery(() =>
    db.ankiNotes.where("ankiDeckId").equals(deckId).toArray(),
  );

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
        {ankiNotes?.map((ankiNote: AnkiNote) => (
          <TableRow key={ankiNote.id}>
            <TableCell>{ankiNote.wordOrExpression}</TableCell>
            <TableCell>{ankiNote.definition}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() => deleteNote(ankiNote.id!!)}
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
