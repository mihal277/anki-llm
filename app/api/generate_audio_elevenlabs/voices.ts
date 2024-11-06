import { Language } from "@/app/language";

export const spanishSharedVoices = [
  {
    publicUserId:
      "e9a6840c69b79812b77ea81fa11d55aaf80dcf1938fa0137bf7f514f67f75c99",
    voiceId: "y6WtESLj18d0diFRruBs",
    name: "David Martin 2",
  },
  {
    publicUserId:
      "e9a6840c69b79812b77ea81fa11d55aaf80dcf1938fa0137bf7f514f67f75c99",
    voiceId: "Ir1QNHvhaJXbAGhT50w3",
    name: "Sara Martin 2",
  },
];

export const germanSharedVoices = [
  {
    publicUserId:
      "80d9191368f6824d0aacf4080a0894aecb0c4bdd82928eb623e585caf54a84b7",
    voiceId: "FTNCalFNG5bRnkkaP5Ug",
    name: "Otto",
  },
];

// TODO: add more after verifying shore inputs don't result in gibberish
const premadeVoiceNames = ["Roger"];

export const getSharedVoicesExpectedInLibrary = (language: Language) => {
  switch (language) {
    case Language.Spanish:
      return spanishSharedVoices;
    case "German":
      return germanSharedVoices;
    default:
      throw Error(`Language ${language} does not use any shared voices`);
  }
};

const getRandomItem = <T>(set: Set<T>) =>
  Array.from(set)[Math.floor(Math.random() * set.size)];

export const getVoiceNameFor = (
  textInput: string,
  language: Language,
): string => {
  // The assumption is that all shared voices are in the library!
  // TODO: support default voices for longer spanish/german sentences.
  switch (language) {
    case Language.Spanish:
      return getRandomItem(
        new Set(spanishSharedVoices.map((voice) => voice.name)),
      );
    case "German":
      return getRandomItem(
        new Set(germanSharedVoices.map((voice) => voice.name)),
      );
    case "English":
      return getRandomItem(new Set(premadeVoiceNames));
    default:
      throw Error(`Language ${language} not supported`);
  }
};
