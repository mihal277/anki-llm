import { AudioDataRequest } from "@/app/audio";
import { Language, getLanguage, languageToISO6391 } from "@/app/language";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { spanishSharedVoices } from "./voices";

const addVoicesToLibrary = async (
  client: ElevenLabsClient,
  voicesToAdd: {
    publicUserId: string;
    voiceId: string;
    name: string;
  }[],
) => {
  voicesToAdd.forEach(async (voice) => {
    await client.voices.addSharingVoice(voice.publicUserId, voice.voiceId, {
      new_name: voice.name,
    });
  });
};

const getSpanishVoicesToUseFromLibrary = async (client: ElevenLabsClient) => {
  const allVoicesInLibrary = await client.voices.getAll();
  return allVoicesInLibrary.voices.filter((voice) =>
    spanishSharedVoices.some(
      (sharedVoice) => sharedVoice.voiceId === voice.voice_id,
    ),
  );
};

const addSharedSpanishVoicesToLibrary = async (client: ElevenLabsClient) => {
  const voicesToUseAlreadyInLibrary =
    await getSpanishVoicesToUseFromLibrary(client);
  const sharedVoicesStillNotInLibrary = spanishSharedVoices.filter(
    (sharedVoice) =>
      !voicesToUseAlreadyInLibrary.some(
        (voice) => voice.voice_id === sharedVoice.voiceId,
      ),
  );
  await addVoicesToLibrary(client, sharedVoicesStillNotInLibrary);
};

const getRandomItem = <T>(set: Set<T>) =>
  Array.from(set)[Math.floor(Math.random() * set.size)];

const streamAudioFromElevenLabs = async (
  textInput: string,
  language: Language,
  client: ElevenLabsClient,
  spanishVoiceNamesToUse: Set<string>,
): Promise<Buffer> => {
  const audioStream = await client.generate({
    voice: getRandomItem(spanishVoiceNamesToUse),
    model_id: "eleven_turbo_v2_5",
    text: textInput,
    language_code: languageToISO6391(language),
  });

  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }

  const content = Buffer.concat(chunks);
  return content;
};

const zipMP3Files = async (
  audioBuffers: Buffer[],
  audioDataRequests: AudioDataRequest[],
) => {
  const zip = new JSZip();
  audioBuffers.forEach((audioBuffer, index) => {
    zip.file(audioDataRequests[index].mp3Name, audioBuffer);
  });
  return await zip.generateAsync({ type: "blob" });
};

export async function POST(request: NextRequest) {
  const bodyJson = await request.json();

  const audioDataRequests: AudioDataRequest[] = bodyJson.audioDataRequests;

  const client = new ElevenLabsClient({
    apiKey: bodyJson.elevenLabsAPIKey,
  });

  await addSharedSpanishVoicesToLibrary(client);
  const spanishVoicesInLibrary = await getSpanishVoicesToUseFromLibrary(client);
  const spanishVoiceNamesInLibrarySet = new Set(
    spanishVoicesInLibrary.map((voice) => voice.name!!),
  );

  // Promise.all couldn't be used here because the ElevenLabs API has a rate limit
  const audioBuffers: Buffer[] = [];
  for (const audioDataRequest of audioDataRequests) {
    const buffer = await streamAudioFromElevenLabs(
      audioDataRequest.content,
      getLanguage(audioDataRequest.language),
      client,
      spanishVoiceNamesInLibrarySet,
    );
    audioBuffers.push(buffer);
  }

  const zipped = await zipMP3Files(audioBuffers, audioDataRequests);

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/zip");
  return new NextResponse(zipped, {
    status: 200,
    statusText: "OK",
    headers: responseHeaders,
  });
}
