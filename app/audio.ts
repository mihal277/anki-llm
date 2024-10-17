import { Language } from "./language";

export interface AudioDataRequest {
  mp3Name: string;
  language: Language;
  content: string;
}
