import { AnkiCard } from "@/app/anki/card";
import { AnkiNote } from "@/app/anki/note";
import { Input } from "@/components/ui/input";

interface CardInputProps {
  ankiNote: AnkiNote;
  ankiCardIndex: number;
  setGeneratedNote: (note: AnkiNote) => void;
}

function CardFrontInput({
  ankiNote,
  ankiCardIndex,
  setGeneratedNote: setGeneratedNote,
}: CardInputProps) {
  const ankiCard = ankiNote.cards[ankiCardIndex];
  return (
    <Input
      value={ankiCard.front.contentHTML}
      onChange={(e) => {
        const updatedAnkiCard = {
          ...ankiCard,
          front: { ...ankiCard.front, contentHTML: e.target.value },
        } as AnkiCard;
        const updatedAnkiCards = ankiNote.cards.map((card, i) =>
          i === ankiCardIndex ? updatedAnkiCard : card,
        );
        setGeneratedNote({
          ...ankiNote,
          cards: updatedAnkiCards,
        });
      }}
    />
  );
}

function CardBackInput({
  ankiNote,
  ankiCardIndex,
  setGeneratedNote,
}: CardInputProps) {
  const ankiCard = ankiNote.cards[ankiCardIndex];
  return (
    <Input
      value={ankiCard.back.contentHTML}
      onChange={(e) => {
        const updatedAnkiCard = {
          ...ankiCard,
          back: { ...ankiCard.back, contentHTML: e.target.value },
        } as AnkiCard;
        const updatedAnkiCards = ankiNote.cards.map((card, i) =>
          i === ankiCardIndex ? updatedAnkiCard : card,
        );
        setGeneratedNote({
          ...ankiNote,
          cards: updatedAnkiCards,
        });
      }}
    />
  );
}

interface EditableAnkiNoteProps {
  ankiNote: AnkiNote;
  setGeneratedNote: (generatedNote: AnkiNote) => void;
}

export function EditableAnkiNote({
  ankiNote,
  setGeneratedNote,
}: EditableAnkiNoteProps) {
  return (
    <div>
      {ankiNote.cards.map((_, i) => (
        <div key={i}>
          <CardFrontInput
            ankiNote={ankiNote}
            ankiCardIndex={i}
            setGeneratedNote={setGeneratedNote}
          />
          <CardBackInput
            ankiNote={ankiNote}
            ankiCardIndex={i}
            setGeneratedNote={setGeneratedNote}
          />
        </div>
      ))}
    </div>
  );
}
