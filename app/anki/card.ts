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

function applyUniqueMp3NamesToCardSide(
  cardSide: AnkiCardSideData,
  uniqueContentToUniqueMp3FileName: Record<string, string>,
): AnkiCardSideData {
  let content = cardSide.contentHTML;
  cardSide.audioData.forEach((audioDataRequest, i) => {
    const mp3FileNameForContent =
      uniqueContentToUniqueMp3FileName[audioDataRequest.content];
    content = content.replace(
      `[sound:${i}.mp3]`,
      `[sound:${mp3FileNameForContent}]`,
    );
  });
  return {
    ...cardSide,
    contentHTML: content,
  };
}

export function applyUniqueMp3NamesToCards(
  cards: AnkiCard[],
  uniqueContentToUniqueMp3FileName: Record<string, string>,
): AnkiCard[] {
  return cards.map((card) => {
    return {
      ...card,
      front: applyUniqueMp3NamesToCardSide(
        card.front,
        uniqueContentToUniqueMp3FileName,
      ),
      back: applyUniqueMp3NamesToCardSide(
        card.back,
        uniqueContentToUniqueMp3FileName,
      ),
    };
  });
}
