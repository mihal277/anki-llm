import { Language } from "./language";
import { v4 as uuid } from "uuid";

export interface AudioDataRequest {
  mp3Name: string;
  language: Language;
  content: string;
}

export const getUniqueMp3Name = () => {
  return `${uuid()}.mp3`;
};
