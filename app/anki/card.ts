import { AudioDataRequest } from "../audio";

export interface AnkiCardSideData {
  contentHTML: string;
  audioData: AudioDataRequest[];
}

export interface AnkiCard {
  front: AnkiCardSideData;
  back: AnkiCardSideData;
  // A note will store all the cards that were generated.
  // The user then selects some of them to be imported into Anki.
  // But the other cards have to remain stored becaue a user
  // can edit the note by selecting more cards.
  selected_for_export: boolean;
}
