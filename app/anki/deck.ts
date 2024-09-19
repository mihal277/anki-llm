import { Language } from "../language";

export interface AnkiDeck {
  id?: number;
  name: string;
  language: Language;
}
