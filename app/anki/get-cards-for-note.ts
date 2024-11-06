import { Language } from "@/app/language";
import { AnkiCard } from "./card";
import {
  getClozeSentenceToFullSentenceBack,
  getClozeSentenceToFullSentenceFront,
} from "./card-types/cloze-sentence-to-full-sentence";
import {
  getFullSentenceToWordWithTargetLangDefBack,
  getFullSentenceToWordWithTargetLangDefFront,
} from "./card-types/full-sentence-to-word-with-target-lang-def";
import {
  getNativeLangMeaningToWordBack,
  getNativeLangMeaningToWordFront,
} from "./card-types/native-lang-meaning-to-word";
import {
  getTargetLangDefToWordBack,
  getTargetLangDefToWordFront,
} from "./card-types/target-lang-def-to-word";
import {
  getTargetLangDefToWordWithSentBack,
  getTargetLangDefToWordWithSentFront,
} from "./card-types/target-lang-def-to-word-with-sent";
import {
  getWordToNativeLangeMeaningWithSentBack,
  getWordToNativeLangeMeaningWithSentFront,
} from "./card-types/word-to-native-lang-meaning-with-sent";
import {
  getWordToTargetLangDefWithSentenceBack,
  getWordToTargetLangDefWithSentenceFront,
} from "./card-types/word-to-target-lang-def-with-sent";
import {
  getWordToTargetLangDefAndNativeMeaningWithSentenceBack,
  getWordToTargetLangDefAndNativeMeaningWithSentenceFront,
} from "./card-types/word-to-target-lang-def-and-nat-meaning-with-sent";
import {
  getRawWordToPronunciationAndTargetLangDefWithSentenceBack,
  getRawWordToPronunciationAndTargetLangDefWithSentenceFront,
} from "./card-types/raw-word-to-pronunciation-and-target-lang-def-with-sent";

export const getDifferentKindsOfCards = (
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  rawExampleSentence: string,
  nativeLangWordMeaning: string,
  language: Language,
): AnkiCard[] => {
  const clozeSentenceToFullSentenceCard: AnkiCard = {
    front: getClozeSentenceToFullSentenceFront(
      rawExampleSentence,
      easyDefinition,
    ),
    back: getClozeSentenceToFullSentenceBack(rawExampleSentence, language),
    selected_for_export: false,
  };

  const fullSentenceToWordWithTargetLangDefCard: AnkiCard = {
    front: getFullSentenceToWordWithTargetLangDefFront(
      rawExampleSentence,
      language,
    ),
    back: getFullSentenceToWordWithTargetLangDefBack(
      wordOrExpression,
      pronunciation,
      easyDefinition,
      language,
    ),
    selected_for_export: false,
  };

  const nativeLangMeaningToWordCard: AnkiCard = {
    front: getNativeLangMeaningToWordFront(nativeLangWordMeaning),
    back: getNativeLangMeaningToWordBack(
      wordOrExpression,
      pronunciation,
      language,
    ),
    selected_for_export: false,
  };

  const targetLangDefToWordWithSentCard: AnkiCard = {
    front: getTargetLangDefToWordWithSentFront(easyDefinition),
    back: getTargetLangDefToWordWithSentBack(
      wordOrExpression,
      pronunciation,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const targetLangDefToWordCard: AnkiCard = {
    front: getTargetLangDefToWordFront(easyDefinition),
    back: getTargetLangDefToWordBack(wordOrExpression, pronunciation, language),
    selected_for_export: false,
  };

  const wordToNativeLangeMeaningWithSentCard: AnkiCard = {
    front: getWordToNativeLangeMeaningWithSentFront(
      wordOrExpression,
      pronunciation,
      language,
    ),
    back: getWordToNativeLangeMeaningWithSentBack(
      nativeLangWordMeaning,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const wordToTargetLangDefWithSentenceCard: AnkiCard = {
    front: getWordToTargetLangDefWithSentenceFront(
      wordOrExpression,
      pronunciation,
      language,
    ),
    back: getWordToTargetLangDefWithSentenceBack(
      easyDefinition,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const wordToTargetLangDefAndNativeMeaningWithSentenceCard: AnkiCard = {
    front: getWordToTargetLangDefAndNativeMeaningWithSentenceFront(
      wordOrExpression,
      pronunciation,
      language,
    ),
    back: getWordToTargetLangDefAndNativeMeaningWithSentenceBack(
      easyDefinition,
      nativeLangWordMeaning,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const rawWordToPronunciationAndTargetLangDefWithSentenceCard: AnkiCard = {
    front: getRawWordToPronunciationAndTargetLangDefWithSentenceFront(
      wordOrExpression,
      language,
    ),
    back: getRawWordToPronunciationAndTargetLangDefWithSentenceBack(
      pronunciation,
      easyDefinition,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  return [
    clozeSentenceToFullSentenceCard,
    fullSentenceToWordWithTargetLangDefCard,
    nativeLangMeaningToWordCard,
    targetLangDefToWordWithSentCard,
    targetLangDefToWordCard,
    wordToNativeLangeMeaningWithSentCard,
    wordToTargetLangDefWithSentenceCard,
    wordToTargetLangDefAndNativeMeaningWithSentenceCard,
    rawWordToPronunciationAndTargetLangDefWithSentenceCard,
  ];
};
