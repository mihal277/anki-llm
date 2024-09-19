import { AnkiDeck } from "@/app/anki/deck";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { DeleteDeckAlert } from "./delete-deck-alert";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/app/db/db";
import { deleteDeck } from "@/app/db/queries";

const onDeleteDeck = async (ankiDeck: AnkiDeck) => {
  await deleteDeck(ankiDeck.id!!);

  toast({
    title: "Deck deleted!",
    description: (
      <div className="flex flex-col mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <div>
          <span className="text-white">Name: </span>
          <span className="text-white font-bold">{ankiDeck.name}</span>
        </div>
        <div>
          <span className="text-white">Language: </span>
          <span className="text-white font-bold">{ankiDeck.language}</span>
        </div>
      </div>
    ),
  });
};

export function DecksTable() {
  const decks = useLiveQuery(() => db.ankiDecks.toArray());

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
        {decks?.map((ankiDeck: AnkiDeck) => (
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
                  onDeleteDeck={() => {
                    onDeleteDeck(ankiDeck);
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
