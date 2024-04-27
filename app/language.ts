export enum Language {
  Spanish = "Spanish",
  English = "English",
  German = "German",
}

export const getLanguage = (language: string): Language => {
  switch (language) {
    case "Spanish":
      return Language.Spanish;
    case "English":
      return Language.English;
    case "German":
      return Language.German;
    default:
      throw new Error(`Language ${language} not supported`);
  }
};
