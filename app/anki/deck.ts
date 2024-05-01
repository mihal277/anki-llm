import { Language } from "../language";
import { AnkiNote } from "./note";

export interface AnkiDeck {
  id: string;
  name: string;
  language: Language;
  notes: AnkiNote[];
}
