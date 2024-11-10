import { Language, getLanguage } from "@/app/language";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { getModelParams, getSharedVoicesExpectedInLibrary } from "./voices";

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

const getSharedVoicesAlreadyInLibrary = async (
  client: ElevenLabsClient,
  voicesExpectedInLibrary: Array<{
    publicUserId: string;
    voiceId: string;
    name: string;
  }>,
) => {
  const allVoicesInLibrary = await client.voices.getAll();
  return allVoicesInLibrary.voices.filter((voice) =>
    voicesExpectedInLibrary.some(
      (sharedVoice) => sharedVoice.voiceId === voice.voice_id,
    ),
  );
};

const addSharedVoicesToLibrary = async (
  client: ElevenLabsClient,
  language: Language,
) => {
  // English uses only the default voices
  if (language === Language.English) return;

  const sharedVoicesExpectedInLibrary =
    getSharedVoicesExpectedInLibrary(language);
  const sharedVoicesAlreadyInLibrary = await getSharedVoicesAlreadyInLibrary(
    client,
    sharedVoicesExpectedInLibrary,
  );
  const sharedVoicesStillNotInLibrary = sharedVoicesExpectedInLibrary.filter(
    (sharedVoice) =>
      !sharedVoicesAlreadyInLibrary.some(
        (voice) => voice.voice_id === sharedVoice.voiceId,
      ),
  );
  await addVoicesToLibrary(client, sharedVoicesStillNotInLibrary);
};

const streamAudioFromElevenLabs = async (
  textInput: string,
  language: Language,
  client: ElevenLabsClient,
): Promise<Buffer> => {
  const { voice, languageCode, model } = getModelParams(textInput, language);

  const audioStream = await client.generate({
    voice: voice,
    model_id: model,
    text: textInput,
    language_code: languageCode,
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
  audioDataRequests: {
    content: string;
    mp3Name: string;
    language: string;
  }[],
) => {
  const zip = new JSZip();
  audioBuffers.forEach((audioBuffer, index) => {
    zip.file(audioDataRequests[index].mp3Name, audioBuffer);
  });
  return await zip.generateAsync({ type: "blob" });
};

export async function POST(request: NextRequest) {
  const bodyJson = await request.json();

  const audioDataRequests: {
    content: string;
    mp3Name: string;
    language: string;
  }[] = bodyJson.audioDataRequests;

  const languages = new Set(
    audioDataRequests.map((request) => request.language),
  );
  if (languages.size !== 1) {
    throw new Error(
      "For simplicity all requests should have just one language",
    );
  }
  const language = getLanguage(audioDataRequests[0].language);

  const client = new ElevenLabsClient({
    apiKey: bodyJson.elevenLabsAPIKey,
  });

  await addSharedVoicesToLibrary(client, language);

  // Promise.all couldn't be used here because the ElevenLabs API has a rate limit
  const audioBuffers: Buffer[] = [];
  for (const audioDataRequest of audioDataRequests) {
    const buffer = await streamAudioFromElevenLabs(
      audioDataRequest.content,
      language,
      client,
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
