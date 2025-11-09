import React from "react";
import { Button } from "../ui/button";
import { generateAnkiNote } from "@/app/anki/generate-note";
import { saveNote as saveNoteInDB } from "@/app/db/queries";
import { Card, CardContent } from "../ui/card";
import DOMPurify from "dompurify";
import { useSearchParams } from "next/navigation";
import {
  NoteGanarationStatus,
  NoteGenerationState,
} from "@/app/create-notes/note-generation-enums";
import { AnkiCard } from "@/app/anki/card";
import { Badge } from "../ui/badge";

const stripMp3TagFromAnkiCardContent = (content: string): string => {
  return content.replace(/\[sound:[^\]]+\.mp3\]/g, "").trim();
};

const saveNote = (
  noteGenerationState: NoteGenerationState,
  setNoteGenerationState: (noteGenerationState: NoteGenerationState) => void,
) => {
  saveNoteInDB(noteGenerationState.generatedNote!!);
  setNoteGenerationState({
    ...noteGenerationState,
    noteGenerationStatus: NoteGanarationStatus.GenerationNotRequestedYet,
  });
};

const regenerateNote = async (
  noteGenerationState: NoteGenerationState,
  setNoteGenerationState: (noteGenerationState: NoteGenerationState) => void,
  deckId: number,
) => {
  setNoteGenerationState({
    ...noteGenerationState,
    noteGenerationStatus: NoteGanarationStatus.GenerationRunning,
  });
  const newAnkiNote = await generateAnkiNote(
    noteGenerationState.wordOrExpression!!,
    noteGenerationState.meaning!!,
    deckId,
  );
  setNoteGenerationState({
    ...noteGenerationState,
    generatedNote: {
      ...newAnkiNote,
      // if the user regenerates the note that is already in db,
      // we want to keep the id so that when saving, the note is overwritten
      id: noteGenerationState.generatedNote?.id,
    },
    noteGenerationStatus: NoteGanarationStatus.ShowGenerated,
  });
};

interface AnkiCardsPickerProps {
  noteGenerationState: NoteGenerationState;
  setNoteGenerationState: (noteGenerationState: NoteGenerationState) => void;
}

export function AnkiCardsPicker({
  noteGenerationState,
  setNoteGenerationState,
}: AnkiCardsPickerProps) {
  const generatedNote = noteGenerationState.generatedNote!!;

  const handleCardClick = (index: number) => {
    const updatedCards = generatedNote.cards.map((card, i) => {
      if (i !== index) return card;

      return {
        ...card,
        selectedForExportAt: card.selectedForExportAt ? null : new Date(),
      };
    }) as AnkiCard[];
    const updatedNote = { ...generatedNote, cards: updatedCards };
    setNoteGenerationState({
      ...noteGenerationState,
      generatedNote: updatedNote,
    });
  };

  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);

  const cardsOrderMap = buildSelectedOrderMap(generatedNote.cards);

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
              className={`relative w-64 h-64 ${
                card.selectedForExportAt ? "outline outline-4" : "border"
              }`}
            >
              {cardsOrderMap.get(i) && (
                <Badge className="absolute bottom-1 right-1 px-0.5 py-0.1">
                  {cardsOrderMap.get(i)}
                </Badge>
              )}

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
          onClick={() => saveNote(noteGenerationState, setNoteGenerationState)}
        >
          Save Note
        </Button>
        {noteGenerationState.noteGenerationStatus !==
          NoteGanarationStatus.EditPreviouslySaved && (
          <Button
            variant="outline"
            onClick={() =>
              regenerateNote(
                noteGenerationState,
                setNoteGenerationState,
                deckId,
              )
            }
          >
            Regenerate
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() =>
            setNoteGenerationState({
              ...noteGenerationState,
              noteGenerationStatus:
                NoteGanarationStatus.GenerationNotRequestedYet,
            })
          }
        >
          Discard
        </Button>
      </div>
    </div>
  );
}

function buildSelectedOrderMap(
  cards: { selectedForExportAt?: Date | null }[],
): Map<number, number> {
  return new Map(
    cards
      .map((c, i) =>
        c.selectedForExportAt
          ? { i, t: c.selectedForExportAt.getTime() }
          : null,
      )
      .filter((x): x is { i: number; t: number } => !!x)
      .sort((a, b) => a.t - b.t)
      .map((x, idx) => [x.i, idx + 1]),
  );
}
