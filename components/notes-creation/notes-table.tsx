import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnkiNote } from "@/app/anki/note";

interface NotesTableProps {
  ankiNotes: AnkiNote[];
}

export function NotesTable({ ankiNotes }: NotesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Word or expression</TableHead>
          <TableHead>Definition</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ankiNotes.map((ankiNote) => (
          <TableRow key={ankiNote.id}>
            <TableCell>{ankiNote.wordOrExpression}</TableCell>
            <TableCell>{ankiNote.definition}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
