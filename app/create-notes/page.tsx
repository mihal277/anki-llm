"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { NotesTable } from "@/components/notes-creation/notes-table";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AnkiNote, getAllDataRequestsOfAnkiNotes } from "@/app/anki/note";
import { AnkiNoteEditor } from "@/components/notes-creation/anki-note-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { makeAnkiImportableCSV } from "../anki/csv";
import { ExternalService } from "../db/db";
import {
  getAllAnkiNotesOfGivenDeck,
  getDeckName,
  getExternalServiceAPIKey,
} from "../db/queries";

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

async function handleDownloadAudioFiles(notes: AnkiNote[]) {
  // todo: handle when eleven labs api key was not provided
  const elevenLabsApiKey = await getExternalServiceAPIKey(
    ExternalService.ElevenLabs,
  )!!;
  const response = await fetch("/api/generate_audio_elevenlabs", {
    method: "POST",
    body: JSON.stringify({
      audioDataRequests: getAllDataRequestsOfAnkiNotes(notes),
      elevenLabsAPIKey: elevenLabsApiKey,
    }),
  });
  const blob = await response.blob();
  downloadBlob(blob, "audio.zip");
}

async function handleDownloadDeckCSV(ankiNotes: AnkiNote[], deckId: number) {
  const deckName = await getDeckName(deckId);
  const csv = makeAnkiImportableCSV(ankiNotes, deckName);
  const blob = new Blob([csv], { type: "text/csv" });
  downloadBlob(blob, "deck.csv");
}

async function handleDownloadAnkiDeck(deckId: number) {
  const ankiNotes: AnkiNote[] = await getAllAnkiNotesOfGivenDeck(deckId);
  await handleDownloadAudioFiles(ankiNotes);
  await handleDownloadDeckCSV(ankiNotes, deckId);
}

export enum NoteGanarationStatus {
  NotGenerated = "GenerationNotRequestedYet",
  GenerationRunning = "GenerationRunning",
  Generated = "Generated",
}

function CreateNotesPageContent() {
  // preventing hydration errors: https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);

  const [generatedNote, setGeneratedNote] = useState<AnkiNote | undefined>(
    undefined,
  );
  const [generationStatus, setGenerationStatus] = useState(
    NoteGanarationStatus.NotGenerated,
  );

  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-2/3">
          {generationStatus === NoteGanarationStatus.NotGenerated ? (
            <NotesCreationInputForm
              setGenerationStatus={setGenerationStatus}
              setGeneratedNote={setGeneratedNote}
            />
          ) : (
            generationStatus === NoteGanarationStatus.Generated && (
              <AnkiNoteEditor
                generatedNote={generatedNote!!}
                setGeneratedNote={setGeneratedNote}
                setGenerationStatus={setGenerationStatus}
              />
            )
          )}
        </div>
        <div className="w-1/3">
          {isClient && (
            <div>
              <NotesTable />
              <Button
                variant="outline"
                onClick={() => handleDownloadAnkiDeck(deckId)}
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
