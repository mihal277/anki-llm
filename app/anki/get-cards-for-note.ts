import { Language } from "@/app/language";
import { AnkiCard } from "./card";
import {
  getClozeCard1Back,
  getClozeCard1Front,
} from "./card-types/cloze-card1";
import {
  getSentenceCardBack,
  getSentenceCardFront,
} from "./card-types/sentence-card";
import {
  getMeaningCardBack,
  getMeaningCardFront,
} from "./card-types/meaning-card";
import {
  getDefinitionCard2Back,
  getDefinitionCard2Front,
} from "./card-types/definition-card2";
import {
  getDefinitionCard1Back,
  getDefinitionCard1Front,
} from "./card-types/definition-card1";
import {
  getTargetWordCard1Back,
  getTargetWordCard1Front,
} from "./card-types/target-word-card1";
import {
  getTargetWordCard3Back,
  getTargetWordCard3Front,
} from "./card-types/target-word-card3";
import {
  getTargetWordCard2Back,
  getTargetWordCard2Front,
} from "./card-types/target-word-card2";
import {
  getClozeCard2Back,
  getClozeCard2Front,
} from "./card-types/cloze-card2";

export const getDifferentKindsOfCards = (
  wordOrExpression: string,
  pronunciation: string,
  easyDefinition: string,
  rawExampleSentence: string,
  nativeLangWordMeaning: string,
  language: Language,
): AnkiCard[] => {
  const clozeCard1: AnkiCard = {
    front: getClozeCard1Front(rawExampleSentence, easyDefinition),
    back: getClozeCard1Back(rawExampleSentence, language),
    selected_for_export: false,
  };

  const clozeCard2: AnkiCard = {
    front: getClozeCard2Front(rawExampleSentence, nativeLangWordMeaning),
    back: getClozeCard2Back(rawExampleSentence, language),
    selected_for_export: false,
  };

  const sentenceCard: AnkiCard = {
    front: getSentenceCardFront(rawExampleSentence, language),
    back: getSentenceCardBack(
      wordOrExpression,
      pronunciation,
      easyDefinition,
      language,
    ),
    selected_for_export: false,
  };

  const meaningCard: AnkiCard = {
    front: getMeaningCardFront(nativeLangWordMeaning),
    back: getMeaningCardBack(wordOrExpression, pronunciation, language),
    selected_for_export: false,
  };

  const definitionCard1: AnkiCard = {
    front: getDefinitionCard1Front(easyDefinition),
    back: getDefinitionCard1Back(
      wordOrExpression,
      pronunciation,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const definitionCard2: AnkiCard = {
    front: getDefinitionCard2Front(easyDefinition),
    back: getDefinitionCard2Back(wordOrExpression, pronunciation, language),
    selected_for_export: false,
  };

  const targetWordCard1: AnkiCard = {
    front: getTargetWordCard1Front(wordOrExpression, pronunciation, language),
    back: getTargetWordCard1Back(
      nativeLangWordMeaning,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const targetWordCard2: AnkiCard = {
    front: getTargetWordCard2Front(wordOrExpression, pronunciation, language),
    back: getTargetWordCard2Back(
      easyDefinition,
      nativeLangWordMeaning,
      rawExampleSentence,
      language,
    ),
    selected_for_export: false,
  };

  const targetWordCard3: AnkiCard = {
    front: getTargetWordCard3Front(wordOrExpression, pronunciation, language),
    back: getTargetWordCard3Back(easyDefinition, rawExampleSentence, language),
    selected_for_export: false,
  };

  return [
    clozeCard1,
    clozeCard2,
    sentenceCard,
    meaningCard,
    definitionCard1,
    definitionCard2,
    targetWordCard1,
    targetWordCard3,
    targetWordCard2,
  ];
};
