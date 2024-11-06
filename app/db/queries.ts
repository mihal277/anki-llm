import { AnkiNote } from "../anki/note";
import { Language } from "../language";
import { db, ExternalService } from "./db";

export const getExternalServiceAPIKey = async (
  service: ExternalService,
): Promise<string | null> => {
  const externalServiceAPIKeysRow = await db.externalServiceAPIKeys
    .where("externalServiceName")
    .equals(service)
    .first();
  return externalServiceAPIKeysRow?.apiKey || null;
};

export const putExternalServiceAPIKey = async (
  service: ExternalService,
  apiKey: string,
) => {
  db.externalServiceAPIKeys.put({
    externalServiceName: service,
    apiKey: apiKey,
  });
};

export const saveNewNote = async (ankiNote: AnkiNote) => {
  // note: it is assumed that the deck exists in the db
  if (ankiNote.id !== undefined) throw Error(`AnkiNote.id must not be set`);
  await db.ankiNotes.add(ankiNote);
};

export const deleteNote = async (noteId: number) => {
  db.ankiNotes.where("id").equals(noteId).delete();
};

export const deleteDeck = async (deckId: number) => {
  db.transaction("rw", db.ankiDecks, db.ankiNotes, async () => {
    db.ankiDecks.where("id").equals(deckId).delete();
    db.ankiNotes.where("ankiDeckId").equals(deckId).delete();
  });
};

export const getAllAnkiNotesOfGivenDeck = async (
  deckId: number,
): Promise<AnkiNote[]> => {
  return await db.ankiNotes.where("ankiDeckId").equals(deckId).toArray();
};

export const getDeckName = async (deckId: number): Promise<string> => {
  const deck = await db.ankiDecks.where("id").equals(deckId).first();
  if (deck === undefined) throw Error(`Deck with id ${deckId} not found`);
  return deck.name;
};

export const getDeckLanguage = async (deckId: number): Promise<Language> => {
  const deck = await db.ankiDecks.where("id").equals(deckId).first();
  if (deck === undefined) throw Error(`Deck with id ${deckId} not found`);
  return deck.language;
};
