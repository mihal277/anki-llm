export enum Language {
  Spanish = "Spanish",
  English = "English",
  German = "German",
  French = "French",
  Russian = "Russian",
}

export const getLanguage = (language: string): Language => {
  switch (language) {
    case "Spanish":
      return Language.Spanish;
    case "English":
      return Language.English;
    case "German":
      return Language.German;
    case "French":
      return Language.French;
    case "Russian":
      return Language.Russian;
    default:
      throw new Error(`Language ${language} not supported`);
  }
};

export const languageToISO6391 = (language: Language): string => {
  switch (language) {
    case Language.Spanish:
      return "es";
    case Language.English:
      return "en";
    case Language.German:
      return "de";
    case Language.French:
      return "fr";
    case Language.Russian:
      return "ru";
  }
};
