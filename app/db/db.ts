import Dexie, { type EntityTable } from "dexie";
import { AnkiDeck } from "../anki/deck";
import { AnkiCard } from "../anki/card";
import { AnkiNote } from "../anki/note";

export enum ExternalService {
  OpenAI = "OpenAI",
  ElevenLabs = "ElevenLabs",
}

export interface ExternalServiceAPIKeys {
  externalServiceName: string;
  apiKey: string;
}

export const db = new Dexie("AnkiLLM_Database") as Dexie & {
  externalServiceAPIKeys: EntityTable<
    ExternalServiceAPIKeys,
    "externalServiceName"
  >;
  ankiDecks: EntityTable<AnkiDeck, "id">;
  ankiNotes: EntityTable<AnkiNote, "id">;
};

db.version(1).stores({
  externalServiceAPIKeys: "&externalServiceName",
  ankiDecks: "++id,&name,language",
  ankiNotes: "++id,ankiDeckId,type",
});
