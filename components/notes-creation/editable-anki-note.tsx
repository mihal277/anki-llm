import { AnkiCard } from "@/app/anki/card";
import { AnkiNoteData } from "@/app/anki/note";
import { Input } from "@/components/ui/input";

interface CardInputProps {
  ankiNoteData: AnkiNoteData;
  ankiCardIndex: number;
  setGeneratedNoteData: (noteData: AnkiNoteData) => void;
}

function CardFrontInput({
  ankiNoteData,
  ankiCardIndex,
  setGeneratedNoteData,
}: CardInputProps) {
  const ankiCard = ankiNoteData.cards[ankiCardIndex];
  return (
    <Input
      value={ankiCard.front.contentHTML}
      onChange={(e) => {
        const updatedAnkiCard = {
          ...ankiCard,
          front: { ...ankiCard.front, contentHTML: e.target.value },
        } as AnkiCard;
        const updatedAnkiCards = ankiNoteData.cards.map((card, i) =>
          i === ankiCardIndex ? updatedAnkiCard : card,
        );
        setGeneratedNoteData({
          ...ankiNoteData,
          cards: updatedAnkiCards,
        });
      }}
    />
  );
}

function CardBackInput({
  ankiNoteData,
  ankiCardIndex,
  setGeneratedNoteData,
}: CardInputProps) {
  const ankiCard = ankiNoteData.cards[ankiCardIndex];
  return (
    <Input
      value={ankiCard.back.contentHTML}
      onChange={(e) => {
        const updatedAnkiCard = {
          ...ankiCard,
          back: { ...ankiCard.back, contentHTML: e.target.value },
        } as AnkiCard;
        const updatedAnkiCards = ankiNoteData.cards.map((card, i) =>
          i === ankiCardIndex ? updatedAnkiCard : card,
        );
        setGeneratedNoteData({
          ...ankiNoteData,
          cards: updatedAnkiCards,
        });
      }}
    />
  );
}

interface EditableAnkiNoteProps {
  ankiNoteData: AnkiNoteData;
  setGeneratedNoteData: (generatedNoteData: AnkiNoteData) => void;
}

export function EditableAnkiNote({
  ankiNoteData,
  setGeneratedNoteData,
}: EditableAnkiNoteProps) {
  return (
    <div>
      {ankiNoteData.cards.map((_, i) => (
        <div key={i}>
          <CardFrontInput
            ankiNoteData={ankiNoteData}
            ankiCardIndex={i}
            setGeneratedNoteData={setGeneratedNoteData}
          />
          <CardBackInput
            ankiNoteData={ankiNoteData}
            ankiCardIndex={i}
            setGeneratedNoteData={setGeneratedNoteData}
          />
        </div>
      ))}
    </div>
  );
}
