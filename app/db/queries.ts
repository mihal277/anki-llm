import { AnkiNoteData } from "../anki/note";
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

export const saveNewNote = async (ankiNoteData: AnkiNoteData) => {
  db.transaction("rw", db.ankiNotes, db.ankiCards, async () => {
    const noteId = await db.ankiNotes.add(ankiNoteData.note);
    ankiNoteData.cards.map((card) => {
      db.ankiCards.add({
        ...card,
        ankiNoteId: noteId,
      });
    });
  });
};

export const deleteNote = async (noteId: number) => {
  db.transaction("rw", db.ankiNotes, db.ankiCards, async () => {
    db.ankiNotes.where("id").equals(noteId).delete();
    db.ankiCards.where("ankiNoteId").equals(noteId).delete();
  });
};

export const getAllAnkiNoteDataOfGivenDeck = async (
  deckId: number,
): Promise<AnkiNoteData[]> => {
  const notes = await db.ankiNotes.where("id").equals(deckId).toArray();
  const noteDataPromises = notes?.map(async (ankiNote) => {
    return {
      note: ankiNote,
      cards: await db.ankiCards
        .where("ankiNoteId")
        .equals(ankiNote.id!!)
        .toArray(),
    };
  });
  return await Promise.all(noteDataPromises);
};

export const getDeckName = async (deckId: number): Promise<string> => {
  const deck = await db.ankiDecks.where("id").equals(deckId).first();
  if (deck === undefined) throw Error(`Deck with id ${deckId} not found`);
  return deck.name;
};
