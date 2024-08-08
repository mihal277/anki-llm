"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { NotesTable } from "@/components/notes-creation/notes-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { DECKS_STORAGE_KEY, getFromStorage } from "@/app/storage";
import { AnkiDeck } from "@/app/anki/deck";
import { AnkiNote } from "@/app/anki/note";
import { EditableAnkiNote } from "@/components/notes-creation/editable-anki-note";

function CreateNotesPageContent() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  const [notes, setNotes] = useState(
    getFromStorage(DECKS_STORAGE_KEY, []).find(
      (deck: AnkiDeck) => deck.id === deckId,
    )?.notes ?? [],
  );
  const [isGenerationRunning, setIsGenerationRunning] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<AnkiNote>();

  const isGenerated = generatedNote !== undefined;
  const shouldDisplayInputForm = !(isGenerationRunning || isGenerated);

  return (
    <>
      <div className="flex">
        <div className="w-2/3">
          {shouldDisplayInputForm ? (
            <NotesCreationInputForm
              setIsGenerationRunning={setIsGenerationRunning}
              setGeneratedNote={setGeneratedNote}
            />
          ) : (
            <EditableAnkiNote
              isGenerationRunning={isGenerationRunning}
              ankiNote={generatedNote as AnkiNote}
              setGeneratedNote={setGeneratedNote}
            />
          )}
        </div>
        <div className="w-1/3">
          <NotesTable ankiNotes={notes} />
        </div>
      </div>
    </>
  );
}

export default function CreateNotesPage() {
  return (
   <Suspense>
      <CreateNotesPageContent />
    </Suspense>
  );
}
