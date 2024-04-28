import lscache from "lscache";

export const OPEN_AI_STORAGE_KEY = "openAIKey";
export const PLAY_HT_USER_ID_STORAGE_KEY = "playHtUserId";
export const PLAY_HT_KEY_STORAGE_KEY = "playHtKey";
export const DECKS_STORAGE_KEY = "decks";

export const getFromStorage = (
  key: string,
  defaultValue: any = undefined,
): any => lscache.get(key) ?? defaultValue;
export const addToStorage = (key: string, value: any) => {
  lscache.set(key, value);
};
