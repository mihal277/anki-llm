import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { AddDeckForm } from "./add-deck-form";
import { AnkiDeck } from "@/app/anki/deck";
import { useState } from "react";

interface AddDeckPopoverProps {
  ankiDecks: AnkiDeck[];
  setAnkiDecks: (ankiDecks: AnkiDeck[]) => void;
}

export function AddDeckPopover({
  ankiDecks,
  setAnkiDecks,
}: AddDeckPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-w-min">
          Add deck
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <AddDeckForm
          ankiDecks={ankiDecks}
          setAnkiDecks={setAnkiDecks}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
