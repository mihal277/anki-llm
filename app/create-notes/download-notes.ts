import { AnkiNote, postprocessNotesForExport } from "@/app/anki/note";
import { makeAnkiImportableCSV } from "../anki/csv";
import { ExternalService } from "../db/db";
import {
  getAllAnkiNotesOfGivenDeck,
  getDeckLanguage,
  getDeckName,
  getExternalServiceAPIKey,
} from "../db/queries";
import { Language } from "../language";

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

async function handleDownloadAudioFiles(
  contentToMp3Name: Record<string, string>,
  deckLanguage: Language,
) {
  // todo: handle when eleven labs api key was not provided
  const elevenLabsApiKey = await getExternalServiceAPIKey(
    ExternalService.ElevenLabs,
  )!!;
  const response = await fetch("/api/generate_audio_elevenlabs", {
    method: "POST",
    body: JSON.stringify({
      audioDataRequests: Object.entries(contentToMp3Name).map(
        ([content, mp3Name]) => {
          return {
            content,
            mp3Name,
            language: deckLanguage.valueOf(),
          };
        },
      ),
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

export async function handleDownloadAnkiDeck(deckId: number) {
  const ankiNotes: AnkiNote[] = await getAllAnkiNotesOfGivenDeck(deckId);
  const { posprecessedAnkiNotes, contentToMp3Name } =
    postprocessNotesForExport(ankiNotes);
  const deckLanguage = await getDeckLanguage(deckId);
  await handleDownloadAudioFiles(contentToMp3Name, deckLanguage);
  await handleDownloadDeckCSV(posprecessedAnkiNotes, deckId);
}
