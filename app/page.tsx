"use client";

import { useEffect, useState } from "react";
import { getFromStorage } from "./storage";
import { DecksTable } from "@/components/decks/decks-table";
import { AddDeckPopover } from "@/components/decks/add-deck-popover";

export default function Home() {
  const [decks, setDecks] = useState(getFromStorage("decks", []));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col max-w-fit mx-auto">
      <div className="self-center mt-1">
        <AddDeckPopover ankiDecks={decks} setAnkiDecks={setDecks} />
      </div>
      <div className="max-w-fit mx-auto">
        {isClient ? (
          <DecksTable ankiDecks={decks} setAnkiDecks={setDecks} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
