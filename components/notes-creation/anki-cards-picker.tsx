import React from "react";
import { Button } from "../ui/button";
import {
  InputForNoteGeneration,
  NoteGanarationStatus,
} from "@/app/create-notes/page";
import { generateAnkiNote } from "@/app/anki/generate-note";
import { saveNewNote } from "@/app/db/queries";
import { AnkiNote } from "@/app/anki/note";
import { Card, CardContent } from "../ui/card";
import DOMPurify from "dompurify";
import { useSearchParams } from "next/navigation";

const stripMp3TagFromAnkiCardContent = (content: string): string => {
  return content.replace(/\[sound:[^\]]+\.mp3\]/g, "").trim();
};

const saveNote = (
  generatedNote: AnkiNote,
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void,
) => {
  saveNewNote(generatedNote);
  setGenerationStatus(NoteGanarationStatus.NotGenerated);
};

const regenerateNote = async (
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void,
  setGeneratedNote: (generatedNote: AnkiNote) => void,
  inputForNoteGeneration: InputForNoteGeneration,
  deckId: number,
) => {
  setGenerationStatus(NoteGanarationStatus.GenerationRunning);
  const ankiNote = await generateAnkiNote(
    inputForNoteGeneration.wordOrExpression!!,
    inputForNoteGeneration.meaning!!,
    deckId,
  );
  setGeneratedNote(ankiNote);
  setGenerationStatus(NoteGanarationStatus.Generated);
};

interface AnkiCardsPickerProps {
  generatedNote: AnkiNote;
  setGeneratedNote: (generatedNote: AnkiNote) => void;
  setGenerationStatus: (generationStatus: NoteGanarationStatus) => void;
  inputForNoteGeneration: InputForNoteGeneration;
}

export function AnkiCardsPicker({
  generatedNote,
  setGeneratedNote,
  setGenerationStatus,
  inputForNoteGeneration,
}: AnkiCardsPickerProps) {
  const handleCardClick = (index: number) => {
    const updatedCards = generatedNote.cards.map((card, i) =>
      i === index
        ? { ...card, selected_for_export: !card.selected_for_export }
        : card,
    );
    setGeneratedNote({ ...generatedNote, cards: updatedCards });
  };

  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {generatedNote.cards.map((card, i) => (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            className="cursor-pointer"
          >
            <Card
              className={`w-64 h-64 ${
                card.selected_for_export
                  ? "outline outline-4 outline-black"
                  : "border"
              }`}
            >
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      stripMp3TagFromAnkiCardContent(card.front.contentHTML),
                    ),
                  }}
                />
                <hr className="w-full" />
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      stripMp3TagFromAnkiCardContent(card.back.contentHTML),
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="pl-4">
        <Button
          variant="outline"
          onClick={() => saveNote(generatedNote, setGenerationStatus)}
        >
          Save Note
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            regenerateNote(
              setGenerationStatus,
              setGeneratedNote,
              inputForNoteGeneration,
              deckId,
            )
          }
        >
          Regenerate
        </Button>
        <Button
          variant="outline"
          onClick={() => setGenerationStatus(NoteGanarationStatus.NotGenerated)}
        >
          Discard
        </Button>
      </div>
    </div>
  );
}
