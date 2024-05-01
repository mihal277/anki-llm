import { Language } from "../language";
import { NormalizedExampleSentence } from "./normalized-example-sentence";
import { AnkiCardSideData } from "./types";
import { v4 as uuid } from "uuid";

const getUniqueMp3Name = () => {
  return `${uuid()}.mp3`;
};

export class AnkiCard {
  front: AnkiCardSideData;
  back: AnkiCardSideData;

  constructor(front: AnkiCardSideData, back: AnkiCardSideData) {
    this.front = front;
    this.back = back;
  }
}

export class ClozeSentenceAnkiCard extends AnkiCard {
  constructor(
    exampleSentence: NormalizedExampleSentence,
    easyDefinition: string,
    language: Language,
  ) {
    const front = ClozeSentenceAnkiCard.getFront(
      exampleSentence,
      easyDefinition,
    );
    const back = ClozeSentenceAnkiCard.getBack(exampleSentence, language);
    super(front, back);
  }

  private static getFront(
    exampleSentence: NormalizedExampleSentence,
    easyDefinition: string,
  ): AnkiCardSideData {
    const underscoredSentence =
      exampleSentence.getWithInsideOfTokensReplacedWithUnderscores();
    return {
      contentHTML: `${easyDefinition}:<br><br>${underscoredSentence}`,
      audioData: [],
    };
  }

  private static getBack(
    exampleSentence: NormalizedExampleSentence,
    language: Language,
  ): AnkiCardSideData {
    const mp3FileName = getUniqueMp3Name();
    const contentHTML = `${exampleSentence.getAsHTMLBold()}<br><br>[sound:${mp3FileName}]`;
    return {
      contentHTML: contentHTML,
      audioData: [
        {
          mp3Name: mp3FileName,
          language: language,
          content: exampleSentence.getWithoutWordTokens(),
        },
      ],
    };
  }
}

export class SimpleTranslationAnkiCard extends AnkiCard {
  constructor(
    wordOrExpression: string,
    pronunciation: string,
    easyDefinition: string,
    language: Language,
  ) {
    const front = SimpleTranslationAnkiCard.getFront(easyDefinition);
    const back = SimpleTranslationAnkiCard.getBack(
      wordOrExpression,
      pronunciation,
      language,
    );
    super(front, back);
  }

  private static getFront(easyDefinition: string): AnkiCardSideData {
    return {
      contentHTML: `${easyDefinition}`,
      audioData: [],
    };
  }

  private static getBack(
    wordOrExpression: string,
    pronunciation: string,
    language: Language,
  ): AnkiCardSideData {
    const mp3FileName = getUniqueMp3Name();
    const contentHTML = `${wordOrExpression} ${pronunciation}<br><br>[sound:${mp3FileName}]`;
    return {
      contentHTML: contentHTML,
      audioData: [
        {
          mp3Name: mp3FileName,
          language: language,
          content: wordOrExpression,
        },
      ],
    };
  }
}
