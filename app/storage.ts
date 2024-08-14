import lscache from "lscache";
import { AnkiDeck } from "./anki/deck";
import { AnkiNote } from "./anki/note";

export const OPEN_AI_STORAGE_KEY = "openAIKey";
export const PLAY_HT_USER_ID_STORAGE_KEY = "playHtUserId";
export const PLAY_HT_KEY_STORAGE_KEY = "playHtKey";
export const ELEVENLABS_API_KEY_STORAGE_KEY = "elevenLabsAPIKey";
export const DECKS_STORAGE_KEY = "decks";

export const getFromStorage = (
  key: string,
  defaultValue: any = undefined,
): any => lscache.get(key) ?? defaultValue;
export const addToStorage = (key: string, value: any) => {
  lscache.set(key, value);
};

export const saveInStorage = (key: string, value: any) => {
  lscache.set(key, value);
};

export const getNotesOfGivenDeckFromStorage = (deckId: string): any => {
  const decks: AnkiDeck[] = getFromStorage(DECKS_STORAGE_KEY, []);
  const deck = decks.find((deck: any) => deck.id === deckId);
  return deck?.notes ?? [];
};

export const saveNotesInGivenDeckInStorage = (
  deckId: string,
  notes: AnkiNote[],
) => {
  const decks: AnkiDeck[] = getFromStorage(DECKS_STORAGE_KEY, []);
  const newDecks = decks.map((deck) => {
    if (deck.id === deckId) {
      return { ...deck, notes };
    }
    return deck;
  });
  saveInStorage(DECKS_STORAGE_KEY, newDecks);
};
