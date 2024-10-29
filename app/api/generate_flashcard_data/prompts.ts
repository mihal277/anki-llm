import { Language } from "@/app/language";

export const ipaPronunciationDescription = `the pronunciation of the word/expression \
in the International Phonetic Alphabet. You provide the pronunciation inside square brackets.`;

export const easyDefinitionDescription = ($: { language: Language }) =>
  `a short and simple definition of the word \
or expression in ${$.language} as in a ${$.language} learner's dictionary. \ 
The definition is only in ${$.language}, \
without defining it in other languages. \
Don't use the word/expression in the definition \
(also, don't use near-synonyms with common root etc.). \
The definition should only contain common words.`;

export const simpleExampleSentenceDescription = ($: {
  language: Language;
}) => `a simple medium-long example sentence 
  in ${$.language} using the word/expression. Ideally, use the basic form of the word. 
  The word that the sentence is about should be between <w> and </w>.
  The sentence contains only common words.`;

const pronunciationExamplesSpanish = `
  tener: [teˈner],
  vista: [ˈbista],
  enseguida: [enseˈɣiða],
  conseguir: [konseˈɣir]
`;

const pronunciationExamplesEnglish = `
  perform: [pəˈfɔ:m],
  border: [ˈbɔ:dəʳ],
  almost: [ˈɔ:lməʊst],
  drunk: [drʌŋk]
`;

const pronunciationExamplesGerman = `
krank: [kraŋk],
Wirtschaft: [ˈvɪrtʃaft],
gesund: [gəˈzʊnt],
Beziehung: [bəˈtsi:ʊŋ] 
`;

const pronunciationExamplesMap = {
  [Language.Spanish]: pronunciationExamplesSpanish,
  [Language.English]: pronunciationExamplesEnglish,
  [Language.German]: pronunciationExamplesGerman,
};

export const getDataForAnkiPrompt = ($: {
  language: Language;
  wordOrExpression: string;
  meaning: string;
}): string => `
  You produce Anki cards for ${$.language} learners.
  You act as a ${$.language} learner's dictionary (one with easy definitions and example sentences).

  Create an Anki card for the ${$.language} word/expression "${$.wordOrExpression}",
  with the meaning "${$.meaning}" (this meaning might be provided in another language).

  When providing the pronunciation, here are some examples:
  ${pronunciationExamplesMap[$.language]}
  They are taken from a dictionary.
  You provide the pronunciation inside square brackets.

  In the example sentence the word that the sentence is about should be between <w> and </w>.
`;
