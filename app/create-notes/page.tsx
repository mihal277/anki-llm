"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { NotesTable } from "@/components/notes-creation/notes-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { getNotesOfGivenDeckFromStorage } from "@/app/storage";
import { AnkiNote } from "@/app/anki/note";
import { AnkiNoteEditor } from "@/components/notes-creation/anki-note-editor";

function CreateNotesPageContent() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId")!!;
  const [notesInDeck, setNotesInDeck] = useState(
    getNotesOfGivenDeckFromStorage(deckId),
  );
  const [isGenerationRunning, setIsGenerationRunning] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<AnkiNote | undefined>();

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
            !isGenerationRunning && (
              <AnkiNoteEditor
                ankiNote={generatedNote as AnkiNote}
                notesInDeck={notesInDeck}
                setNotesInDeck={setNotesInDeck}
                setGeneratedNote={setGeneratedNote}
              />
            )
          )}
        </div>
        <div className="w-1/3">
          <NotesTable ankiNotes={notesInDeck} />
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
