import { AudioDataRequest } from "@/app/audio";
import { Language, getLanguage, languageToISO6391 } from "@/app/language";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

const streamAudioFromElevenLabs = async (
  textInput: string,
  language: Language,
  client: ElevenLabsClient,
): Promise<Buffer> => {
  const audioStream = await client.generate({
    voice: "Rachel",
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

  const audioBuffers: Buffer[] = await Promise.all(
    audioDataRequests.map((audioDataRequest) =>
      streamAudioFromElevenLabs(
        audioDataRequest.content,
        getLanguage(audioDataRequest.language),
        client,
      ),
    ),
  );

  const zipped = await zipMP3Files(audioBuffers, audioDataRequests);

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/zip");
  return new NextResponse(zipped, {
    status: 200,
    statusText: "OK",
    headers: responseHeaders,
  });
}
