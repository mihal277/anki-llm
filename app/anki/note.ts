import { AudioDataRequest } from "../audio";
import { AnkiCard } from "./card";
import { v4 as uuid } from "uuid";

export enum AnkiNoteType {
  Basic = "Basic",
  BasicAndReversed = "Basic (and reversed card)",
  TwoConnectedCards = "2 connected cards",
  TwoBasicAndReversed = "2x basic and reversed",
}

export class AnkiNote {
  type: AnkiNoteType;
  cards: AnkiCard[];

  constructor(type: AnkiNoteType, cards: AnkiCard[]) {
    this.type = type;
    this.cards = cards;
  }

  toCSVRow(deckName: string): string {
    const guid = uuid();
    const noteType = this.type.valueOf();
    const tags = "";

    const cardColumns = this.cards.map(
      (card) => `${card.front.contentHTML}\t${card.back.contentHTML}`,
    );
    return [guid, noteType, deckName, ...cardColumns, tags].join("\t");
  }

  getAllAudioData(): AudioDataRequest[] {
    return this.cards
      .map((card) => card.front.audioData.concat(card.back.audioData))
      .reduce((acc, val) => acc.concat(val), []);
  }
}
