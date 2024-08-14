"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { NotesTable } from "@/components/notes-creation/notes-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  ELEVENLABS_API_KEY_STORAGE_KEY,
  getFromStorage,
  getNotesOfGivenDeckFromStorage,
} from "@/app/storage";
import { AnkiNote, getAllDataRequestsOfAnkiNotes } from "@/app/anki/note";
import { AnkiNoteEditor } from "@/components/notes-creation/anki-note-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

async function handleDownloadAnkiDeck(notes: AnkiNote[]) {
  const response = await fetch("/api/generate_audio_elevenlabs", {
    method: "POST",
    body: JSON.stringify({
      audioDataRequests: getAllDataRequestsOfAnkiNotes(notes),
      elevenLabsAPIKey: getFromStorage(ELEVENLABS_API_KEY_STORAGE_KEY),
    }),
  });
  // download payload as a file:
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sounds.zip";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

function CreateNotesPageContent() {
  // preventing hydration errors: https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          {isClient && (
            <div>
              <NotesTable
                ankiNotes={notesInDeck}
                setNotes={setNotesInDeck}
                deckId={deckId}
              />
              <Button
                variant="outline"
                onClick={() => handleDownloadAnkiDeck(notesInDeck)}
              >
                <Download />
              </Button>
            </div>
          )}
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
