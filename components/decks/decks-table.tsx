import { AnkiDeck } from "@/app/anki/deck";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePlus2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DECKS_STORAGE_KEY, addToStorage } from "@/app/storage";
import { toast } from "@/components/ui/use-toast";
import { Language } from "@/app/language";
import { DeleteDeckAlert } from "./delete-deck-alert";
import Link from "next/link";

interface DecksTableProps {
  ankiDecks: AnkiDeck[];
  setAnkiDecks: (ankiDecks: AnkiDeck[]) => void;
}

const deleteDeck = (
  deckId: string,
  deckName: string,
  language: Language,
  ankiDecks: AnkiDeck[],
  setAnkiDecks: (ankiDecks: AnkiDeck[]) => void,
) => {
  const updatedDecks = ankiDecks.filter((deck) => deck.id !== deckId);
  setAnkiDecks(updatedDecks);
  addToStorage(DECKS_STORAGE_KEY, updatedDecks);

  toast({
    title: "Deck deleted!",
    description: (
      <div className="flex flex-col mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <div>
          <span className="text-white">Name: </span>
          <span className="text-white font-bold">{deckName}</span>
        </div>
        <div>
          <span className="text-white">Language: </span>
          <span className="text-white font-bold">{language}</span>
        </div>
      </div>
    ),
  });
};

export function DecksTable({ ankiDecks, setAnkiDecks }: DecksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deck name</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Create or export notes</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ankiDecks.map((ankiDeck) => (
          <TableRow key={ankiDeck.id}>
            <TableCell className="font-medium">{ankiDeck.name}</TableCell>
            <TableCell>{ankiDeck.language.valueOf()}</TableCell>
            <TableCell>
              <div className="flex justify-center">
                <Link
                  href={{
                    pathname: "/create-notes",
                    query: { deckId: ankiDeck.id },
                  }}
                >
                  <Button variant="outline">
                    <FilePlus2 />
                  </Button>
                </Link>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <DeleteDeckAlert
                  deleteDeck={() => {
                    deleteDeck(
                      ankiDeck.id,
                      ankiDeck.name,
                      ankiDeck.language,
                      ankiDecks,
                      setAnkiDecks,
                    );
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
