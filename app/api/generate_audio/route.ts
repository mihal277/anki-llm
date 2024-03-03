import { AudioDataRequest } from "@/app/audio";
import { Language, getLanguage } from "@/app/language";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

const asyncWait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getVoiceByLanguage = (language: Language) => {
  switch (language) {
    case Language.Spanish:
      return "Isabella";
    case Language.English:
      return "Emilia";
    case Language.German:
      return "Vicki";
  }
};

const getAudioBlobFromPlayHt = async (
  textInput: string,
  language: Language,
  playHTUserId: string,
  playHTKey: string,
): Promise<ArrayBuffer> => {
  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    AUTHORIZATION: playHTKey,
    "X-USER-ID": playHTUserId,
  };

  const convertTranscribe = async () => {
    const payload = {
      content: [textInput],
      voice: getVoiceByLanguage(language),
    };

    const response = await fetch("https://api.play.ht/api/v1/convert", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
      throw new Error(`Failed to convert text to audio`);
    }

    const responseJson = await response.json();

    const pollUrl = [
      "https://api.play.ht/api/v1/articleStatus?transcriptionId=",
      responseJson.transcriptionId,
    ].join("");

    let poll = async () => {
      let res = await fetch(pollUrl, { method: "GET", headers: headers });
      let respJson = await res.json();

      if (respJson.converted) {
        const resp = await fetch(respJson.audioUrl);
        // zipping a blob is broken: https://github.com/Stuk/jszip/issues/899
        return await resp.arrayBuffer();
      } else {
        await asyncWait(1000);
        return poll();
      }
    };

    return await poll();
  };

  return await convertTranscribe();
};

const zipMP3Files = async (
  audioArrayBuffers: ArrayBuffer[],
  audioDataRequests: AudioDataRequest[],
) => {
  const zip = new JSZip();
  audioArrayBuffers.forEach((audioArrayBuffer, index) => {
    zip.file(audioDataRequests[index].mp3Name, audioArrayBuffer);
  });
  return await zip.generateAsync({ type: "blob" });
};

export async function POST(request: NextRequest) {
  const bodyJson = await request.json();

  const audioDataRequests: AudioDataRequest[] = bodyJson.audioDataRequests;
  const playHTUserId = bodyJson.playHTUserId;
  const playHTKey = bodyJson.playHTKey;

  const audioBlobs = await Promise.all(
    audioDataRequests.map((audioDataRequest) =>
      getAudioBlobFromPlayHt(
        audioDataRequest.content,
        getLanguage(audioDataRequest.language),
        playHTUserId,
        playHTKey,
      ),
    ),
  );

  const zipped = await zipMP3Files(audioBlobs, audioDataRequests);

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/zip");
  return new NextResponse(zipped, {
    status: 200,
    statusText: "OK",
    headers: responseHeaders,
  });
}
