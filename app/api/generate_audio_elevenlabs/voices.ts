import { Language, languageToISO6391 } from "@/app/language";

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

export const englishSharedVoices = [
  {
    publicUserId:
      "4e120f88d43f125a4c1f56885db63990e17568c80c5cca2f9f3a6459230fbeb1",
    voiceId: "XjLkpWUlnhS8i7gGz3lZ",
    name: "David Castlemore - Newsreader and Educator",
  },
];

export const frenchSharedVoices = [
  {
    publicUserId:
      "cf85fd3407013597c7721531f6fb44212866034556a7b7127a3a41d30d81522b",
    voiceId: "Qrl71rx6Yg8RvyPYRGCQ",
    name: "Guillaume - French voice - Narration and Voiceover",
  },
];

export const russianSharedVoices = [
  {
    publicUserId:
      "b97690a95ddc81ce0522763133e91ad14a3058d8fd44c9c84a31e29e740ce403",
    voiceId: "MWyJiWDobXN8FX3CJTdE",
    name: "Oleg",
  },
];

// TODO: add more after verifying shore inputs don't result in gibberish
const premadeVoiceNames = ["Roger"];

export const getSharedVoicesExpectedInLibrary = (language: Language) => {
  switch (language) {
    case Language.Spanish:
      return spanishSharedVoices;
    case Language.German:
      return germanSharedVoices;
    case Language.English:
      return englishSharedVoices;
    case Language.French:
      return frenchSharedVoices;
    case Language.Russian:
      return russianSharedVoices;
    default:
      throw Error(`Language ${language} does not use any shared voices`);
  }
};

const getRandomItem = <T>(set: Set<T>) =>
  Array.from(set)[Math.floor(Math.random() * set.size)];

export interface ElevenLabsModelParams {
  model: string;
  languageCode: string | undefined;
  voice: string;
}

function countWords(str: string): number {
  const words = str.trim().split(/\s+/);
  return words.filter((word) => word.length > 0).length;
}

export const getModelParams = (
  textInput: string,
  language: Language,
): ElevenLabsModelParams => {
  // The assumption is that all shared voices are in the library!
  // TODO: support default voices for longer spanish/german sentences.

  switch (language) {
    case Language.Spanish:
      return {
        voice: getRandomItem(
          new Set(spanishSharedVoices.map((voice) => voice.name)),
        ),
        model: "eleven_turbo_v2_5",
        languageCode: languageToISO6391(language),
      };
    case Language.German:
      return {
        voice: getRandomItem(
          new Set(germanSharedVoices.map((voice) => voice.name)),
        ),
        model: "eleven_turbo_v2_5",
        languageCode: languageToISO6391(language),
      };
    case Language.English:
      // todo make similar for other languages, make a const
      if (countWords(textInput) > 5) {
        return {
          voice: getRandomItem(new Set(premadeVoiceNames)),
          model: "eleven_multilingual_v2",
          languageCode: undefined,
        };
      } else {
        return {
          voice: getRandomItem(
            new Set(englishSharedVoices.map((voice) => voice.name)),
          ),
          model: "eleven_turbo_v2_5",
          languageCode: languageToISO6391(language),
        };
      }
    case Language.French:
      return {
        voice: getRandomItem(
          new Set(frenchSharedVoices.map((voice) => voice.name)),
        ),
        model: "eleven_turbo_v2_5",
        languageCode: languageToISO6391(language),
      };
    case Language.Russian:
      return {
        voice: getRandomItem(
          new Set(russianSharedVoices.map((voice) => voice.name)),
        ),
        model: "eleven_turbo_v2_5",
        languageCode: languageToISO6391(language),
      };
    default:
      throw Error(`Language ${language} not supported`);
  }
};
