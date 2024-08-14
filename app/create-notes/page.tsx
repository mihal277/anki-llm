"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { NotesTable } from "@/components/notes-creation/notes-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ELEVENLABS_API_KEY_STORAGE_KEY, getFromStorage, getNotesOfGivenDeckFromStorage } from "@/app/storage";
import { AnkiNote } from "@/app/anki/note";
import { AnkiNoteEditor } from "@/components/notes-creation/anki-note-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AudioDataRequest } from "../audio";

async function handleDownloadAnkiDeck(notes: AnkiNote[]) {
  const audioDataRequests: AudioDataRequest[] = notes.map((note) => ({
    mp3Name: note.;
    language: Language;
    content: string;
  }));
  const response = await fetch("/api/generate_audio_elevenlabs", {
    method: "POST",
    body: JSON.stringify({
      audioDataRequests: ,
      elevenLabsAPIKey: getFromStorage(ELEVENLABS_API_KEY_STORAGE_KEY),
    }),
  });

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
              ><Download/></Button>
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
