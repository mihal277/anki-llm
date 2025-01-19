import { Language } from "@/app/language";

export const ipaPronunciationDescription = `the pronunciation of the word/expression \
in the International Phonetic Alphabet. You provide the pronunciation inside square brackets.
The pronunciation does not include the article at the beginning, if it is provided.
The pronunciation is correct even if the provided word is not`;

export const easyDefinitionDescription = ($: { language: Language }) =>
  `a short and simple definition of the word \
or expression in ${$.language} as in a ${$.language} learner's dictionary. \ 
The definition is only in ${$.language}, \
without defining it in other languages. \
Don't use the word/expression in the definition \
(also, don't use near-synonyms with common root etc.). \
The definition should only contain very common words, \
ones a beginner student would know. \
Make sure it's as short as possible`;

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
  conseguir: [konseˈɣir],
  campan: [kamˈpana] (note that the pronunciation is provided for the corrected word campana),
  enseguda: [enseˈɣiða] (note that the pronunciation is provided for the corrected word enseguida),
  sabiduría: [saβiðuˈria],
  garrapata: [garraˈpata],
  honradez: [onrraˈðeθ],
  clemencia: [kleˈmenθja],
  rencor: [rreŋˈkor],
  rozar: [rroˈθar],
  tartamudear: [tartamuðeˈar],
  alojamiento: [aloxaˈmjento],
  desprevenido: [despreβeˈniðo],
  escasear: [eskaseˈar]
`;

const pronunciationExamplesEnglish = `
  perform: [pəˈfɔ:m],
  prform: [pəˈfɔ:m] (note that the pronunciation is provided for the corrected word perform),
  border: [ˈbɔ:dəʳ],
  a border: [ˈbɔ:dəʳ] (note that the article is not inlcuded),
  almost: [ˈɔ:lməʊst],
  almst: [ˈɔ:lməʊst] (note that the pronunciation is provided for the corrected word almost),
  drunk: [drʌŋk]
`;

const pronunciationExamplesGerman = `
  krank: [kraŋk],
  krnk: [kraŋk] (note that the pronunciation is provided for the corrected word krank),
  Wirtschaft: [ˈvɪrtʃaft],
  die Wirtschaft: [ˈvɪrtʃaft] (note that the article is not inlcuded),
  gesund: [gəˈzʊnt],
  gesnd: [gəˈzʊnt] (note that the pronunciation is provided for the corrected word gesund),
  Beziehung: [bəˈtsi:ʊŋ] 
`;

const pronunciationExamplesFrench = `
  malade: [malad],
  malaade: [malad] (note that the pronunciation is provided for the corrected word malade),
  maison: [mɛzɔ̃],
  la maison: [mɛzɔ̃] (note that the article is not inlcuded),
  envieux: [ɑ̃vjø, -jøz] (note the pronunciation for both genders),
  enviux: [ɑ̃vjø, -jøz] (note that the pronunciation for both genders are provided for the corrected word),
  heureux: [øʀø, -øz] (note the pronunciation for both genders)
  abattu: [abaty] (note that pronunciation for both genders is the same)
  effrayant: [efʀɛjɑ̃, ɑ̃t]
`;

const pronunciationExamplesRussian = `
  больно́й: [bɐlʲˈnoj],
  боьно́й: [bɐlʲˈnoj] (note that the pronunciation is provided for the corrected word больно́й),
  мужчи́на: [mʊˈɕːinə],
  мужчина: [mʊˈɕːinə] (note that the pronunciation is provided for the corrected word мужчи́на),
  ско́льзкий: [ˈskolʲskʲɪj],
  ско́льзки: [ˈskolʲskʲɪj] (note that the pronunciation is provided for the corrected word ско́льзки)
`;

const pronunciationExamplesMap = {
  [Language.Spanish]: pronunciationExamplesSpanish,
  [Language.English]: pronunciationExamplesEnglish,
  [Language.German]: pronunciationExamplesGerman,
  [Language.French]: pronunciationExamplesFrench,
  [Language.Russian]: pronunciationExamplesRussian,
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

const wordOrExpressionPostprocessingExampleFrench = `
  garçon: le garçon,
  fleur: la fleur,
  flur: la fleur,
  courir: courir,
  courirr: courir,
  malade: malade,
  heureux: heureux (-euse),
  huereux: heureux (-euse),
  heureuse: heureux (-euse),
  douée: doué(e),
  doué: doué(e)
`;

// todo: include some grammar

// const wordOrExpressionPostprocessingExampleRussian = `
//   больно́й: больно́й <бо́лен, больна́, больно́>,
//   больной: больно́й <бо́лен, больна́, больно́>,
//   ста́рый: ста́рый <стар, стара́, ста́ро́>,
//   счастли́вый: счастли́вый <сча́стли́в, -а, -о>,
//   счастли́вй: счастли́вый <сча́стли́в, -а, -о>,
//   сла́бый: сла́бый <слаб, слаба́, сла́бо, сла́бы́>,
//   обы́чный: обы́чный <-чен, -чна>,
//   мужчи́на: мужчи́на <-ы>,
//   продаве́ц: продаве́ц <-вца́>,
//   учи́тель: учи́тель <-я>,
//   учи́тельница: учи́тельница <-ы>,
//   шко́ла: шко́ла <-ы>,
//   де́лать: де́лать <-ю, -ешь [null dk.]с->,
//   де́лть: де́лать <-ю, -ешь [null dk.]с->,
//   теря́ть: теря́ть <-ю, -ешь [null dk.]по->,
//   учи́ться: учи́ться <учу́сь, у́чишься>,
//   учи́тьяс: учи́ться <учу́сь, у́чишься>,
//   с тех пор как: с тех пор как
// `;

const wordOrExpressionPostprocessingExampleRussian = `
  больно́й: больно́й,
  больной: больно́й,
  ста́рый: ста́рый,
  счастли́вый: счастли́вый,
  счастли́вй: счастли́вый,
  сла́бый: сла́бый,
  обы́чный: обы́чный,
  мужчи́на: мужчи́на,
  продаве́ц: продаве́ц,
  учи́тель: учи́тель,
  учи́тельница: учи́тельница,
  шко́ла: шко́ла,
  де́лать: де́лать,
  де́лть: де́лать,
  теря́ть: теря́ть,
  учи́ться: учи́ться,
  учи́тьяс: учи́ться,
  с тех пор как: с тех пор как
`;

const wordOrExpressionPostprocessingExamplesMap = {
  [Language.Spanish]: wordOrExpressionPostprocessingExampleSpanish,
  [Language.English]: wordOrExpressionPostprocessingExampleEnglish,
  [Language.German]: wordOrExpressionPostprocessingExampleGerman,
  [Language.French]: wordOrExpressionPostprocessingExampleFrench,
  [Language.Russian]: wordOrExpressionPostprocessingExampleRussian,
};

export const postprocessedWordOrExpressionDeescription = (
  language: Language,
  wordOrExpression: string,
) => {
  switch (language) {
    case Language.Spanish:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}. \
The postprocessed version of the word/expression is made by fixing any typos and adding \
the article el/la. You only add the article for a standalone noun (single word).
      `;
    case Language.English:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}. \
The postprocessed version of the word/expression is made by fixing any typos.
      `;
    case Language.German:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}. \
The postprocessed version of the word/expression is made by fixing any typos and adding \
the article der/die/das. You only add the article for a standalone noun (single word).
      `;
    case Language.French:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}. \
The postprocessed version of the word/expression is made by fixing any typos and adding \
the correct definite article le/la/l'/les. You only add the article for a standalone noun (single word). \
Additionally, you normalize the adjectives to indicate both genders (as shown in the examples).
      `;
    case Language.Russian:
      return `
        Postprocessed version of the word/expression ${wordOrExpression}. \
The postprocessed version of the word/expression is made by fixing any typos.
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
  They are as if taken from a dictionary.
  You provide the pronunciation inside square brackets.
  You provide a pronunciation for a real word even if it contains a typo.

  Here are some examples for the postprocessed version of the word/expression: 
  ${wordOrExpressionPostprocessingExamplesMap[$.language]}.

  In the example sentence the word that the sentence is about should be between <w> and </w>.
`;
