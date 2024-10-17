import { Language } from "./language";
import { v4 as uuid } from "uuid";

export interface AudioDataRequest {
  language: Language;
  content: string;
}

const lowercaseFirstLetter = (str: string): string => {
  if (str.length === 0) return str;

  const firstChar = str.charAt(0);

  if (/[a-zA-Z]/.test(firstChar)) {
    return firstChar.toLowerCase() + str.slice(1);
  } else {
    return str;
  }
};

const getUniqueMp3Name = (content: string) => {
  const sanitizedContent = lowercaseFirstLetter(
    content
      .slice(0, 20)
      .replace(/[^ -~]+/g, "")
      .replace(/ /g, "_"),
  );
  return `${sanitizedContent}_${uuid().slice(0, 8)}.mp3`;
};

export function mapContentToMp3FileName(
  audioDataRequests: AudioDataRequest[],
): Record<string, string> {
  const fileNames: Record<string, string> = {};

  audioDataRequests.forEach((request) => {
    let fileName = getUniqueMp3Name(request.content);

    // Ensure filename uniqueness by regenerating UUID if collision occurs
    while (Object.values(fileNames).includes(fileName)) {
      fileName = getUniqueMp3Name(request.content);
    }

    fileNames[request.content] = fileName;
  });

  return fileNames;
}
