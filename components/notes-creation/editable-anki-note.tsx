import { AnkiCard } from "@/app/anki/card";
import { AnkiNote } from "@/app/anki/note";
import { Input } from "@/components/ui/input";

interface CardInputProps {
  ankiNote: AnkiNote;
  ankiCard: AnkiCard;
  ankiCardIndex: number;
  setGeneratedNote: (note: AnkiNote) => void;
}

function CardFrontInput({
  ankiNote,
  ankiCard,
  ankiCardIndex,
  setGeneratedNote,
}: CardInputProps) {
  return (
    <Input
      value={ankiCard.front.contentHTML}
      onChange={(e) => {
        const newCard = {
          ...ankiCard,
          front: { ...ankiCard.front, contentHTML: e.target.value },
        } as AnkiCard;
        const newNote = {
          ...ankiNote,
          cards: ankiNote.cards.map((c, j) =>
            j === ankiCardIndex ? newCard : c,
          ),
        } as AnkiNote;
        setGeneratedNote(newNote);
      }}
    />
  );
}

function CardBackInput({
  ankiNote,
  ankiCard,
  ankiCardIndex,
  setGeneratedNote,
}: CardInputProps) {
  return (
    <Input
      value={ankiCard.back.contentHTML}
      onChange={(e) => {
        const newCard = {
          ...ankiCard,
          back: { ...ankiCard.back, contentHTML: e.target.value },
        } as AnkiCard;
        const newNote = {
          ...ankiNote,
          cards: ankiNote.cards.map((c, j) =>
            j === ankiCardIndex ? newCard : c,
          ),
        } as AnkiNote;
        setGeneratedNote(newNote);
      }}
    />
  );
}

interface EditableAnkiNoteProps {
  ankiNote: AnkiNote;
  setGeneratedNote: (note: AnkiNote) => void;
}

export function EditableAnkiNote({
  ankiNote,
  setGeneratedNote,
}: EditableAnkiNoteProps) {
  return (
    <div>
      {ankiNote.cards.map((card, i) => (
        <div key={i}>
          <CardFrontInput
            ankiNote={ankiNote}
            ankiCard={card}
            ankiCardIndex={i}
            setGeneratedNote={setGeneratedNote}
          />
          <CardBackInput
            ankiNote={ankiNote}
            ankiCard={card}
            ankiCardIndex={i}
            setGeneratedNote={setGeneratedNote}
          />
        </div>
      ))}
    </div>
  );
}
