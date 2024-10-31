import { Language } from "@/app/language";

export const ipaPronunciationDescription = `the pronunciation of the word/expression \
in the International Phonetic Alphabet. You provide the pronunciation inside square brackets.
The pronunciation does not include the article at the beginning, if it is provided.`;

export const easyDefinitionDescription = ($: { language: Language }) =>
  `a short and simple definition of the word \
or expression in ${$.language} as in a ${$.language} learner's dictionary. \ 
The definition is only in ${$.language}, \
without defining it in other languages. \
Don't use the word/expression in the definition \
(also, don't use near-synonyms with common root etc.). \
The definition should only contain very common words, \
ones a beginner student would know`;

export const simpleExampleSentenceDescription = ($: {
  language: Language;
}) => `a simple medium-long example sentence 
  in ${$.language} using the word/expression. Ideally, use the basic form of the word. 
  The word that the sentence is about should be between <w> and </w>.
  The sentence contains only very common words, \
  ones a beginner student would know.`;

const pronunciationExamplesSpanish = `
  tener: [teˈner],
  vista: [ˈbista],
  la vista: [ˈbista] (note that the article is not inlcuded),
  la boca: [ˈboka] (note that the article is not inlcuded),
  enseguida: [enseˈɣiða],
  conseguir: [konseˈɣir]
`;

const pronunciationExamplesEnglish = `
  perform: [pəˈfɔ:m],
  border: [ˈbɔ:dəʳ],
  a border: [ˈbɔ:dəʳ] (note that the article is not inlcuded),,
  almost: [ˈɔ:lməʊst],
  drunk: [drʌŋk]
`;

const pronunciationExamplesGerman = `
  krank: [kraŋk],
  Wirtschaft: [ˈvɪrtʃaft],
  die Wirtschaft: [ˈvɪrtʃaft] (note that the article is not inlcuded),
  gesund: [gəˈzʊnt],
  Beziehung: [bəˈtsi:ʊŋ] 
`;

const pronunciationExamplesMap = {
  [Language.Spanish]: pronunciationExamplesSpanish,
  [Language.English]: pronunciationExamplesEnglish,
  [Language.German]: pronunciationExamplesGerman,
};

const wordOrExpressionPostprocessingExampleSpanish = `
  consequir: conseguir,
  agujero: el agujero,
  enseguida: enseguida,
  agujero negro: agujero negro,
  agujeo negro: agujero negro,
  fruta: la fruta,
  frua: la fruta,
  la fruta: la fruta
`;

const wordOrExpressionPostprocessingExampleEnglish = `
  managment: management,
  recognition: recognition,
  recognitiona: recognition,
  black hoel: black hole,
  black hole: black hole,
  make: make
`;

const wordOrExpressionPostprocessingExampleGerman = `
  Beziehung: die Beziehung,
  Bezieung: die Beziehung,
  laufen: laufen,
  Baum: der Baum,
  schwarzes Loch: schwarzes Loch,
  schwarzes Lohc: schwarzes Loch
`;

const wordOrExpressionPostprocessingExamplesMap = {
  [Language.Spanish]: wordOrExpressionPostprocessingExampleSpanish,
  [Language.English]: wordOrExpressionPostprocessingExampleEnglish,
  [Language.German]: wordOrExpressionPostprocessingExampleGerman,
};

export const postprocessedWordOrExpressionDeescription = (
  language: Language,
  wordOrExpression: string,
) => {
  switch (language) {
    case Language.Spanish:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}.
        The postprocessed version of the word/expression is made by fixing any typos and adding
        the article el/la. You only add the article for a standalone noun (single word).
      `;
    case Language.English:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}.
        The postprocessed version of the word/expression is made by fixing any typos.
      `;
    case Language.German:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}.
        The postprocessed version of the word/expression is made by fixing any typos and adding
        the article der/die/das. You only add the article for a standalone noun (single word).
      `;
  }
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

  Here are some examples for the postprocessed version of the word/expression: 
  ${wordOrExpressionPostprocessingExamplesMap[$.language]}.

  In the example sentence the word that the sentence is about should be between <w> and </w>.
`;
