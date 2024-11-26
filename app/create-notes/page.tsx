"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { Suspense, useState } from "react";
import { AnkiNote } from "@/app/anki/note";
import { AnkiCardsPicker } from "@/components/notes-creation/anki-cards-picker";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GeneratedNotesSidebar } from "@/components/notes-creation/notes-sidebar";
import { AnkiCardsPickerSkeleton } from "@/components/notes-creation/anki-cards-picker-skeleton";

export enum NoteGanarationStatus {
  GenerationNotRequestedYet = "GenerationNotRequestedYet",

  GenerationRunning = "GenerationRunning",

  ShowGenerated = "ShowGenerated",
  EditPreviouslySaved = "EditPreviouslySaved",
}
export interface NoteGenerationState {
  noteGenerationStatus: NoteGanarationStatus;

  wordOrExpression: string | undefined;
  meaning: string | undefined;
  generatedNote: AnkiNote | undefined;
}

function CreateNotesPageContent() {
  const [noteGenerationState, setNoteGenerationState] =
    useState<NoteGenerationState>({
      noteGenerationStatus: NoteGanarationStatus.GenerationNotRequestedYet,
      wordOrExpression: undefined,
      meaning: undefined,
      generatedNote: undefined,
    });

  const ankiCardPicker = (
    <AnkiCardsPicker
      noteGenerationState={noteGenerationState}
      setNoteGenerationState={setNoteGenerationState}
    />
  );

  const status2component = {
    [NoteGanarationStatus.GenerationNotRequestedYet]: (
      <NotesCreationInputForm setNoteGenerationState={setNoteGenerationState} />
    ),
    [NoteGanarationStatus.GenerationRunning]: <AnkiCardsPickerSkeleton />,
    [NoteGanarationStatus.ShowGenerated]: ankiCardPicker,
    [NoteGanarationStatus.EditPreviouslySaved]: ankiCardPicker,
  };

  return (
    <SidebarProvider>
      <GeneratedNotesSidebar
        noteGenerationState={noteGenerationState}
        setNoteGenerationState={setNoteGenerationState}
      />
      <div>
        {/* uncomment if there's a proper solution, see https://github.com/shadcn-ui/ui/issues/5629 */}
        {/* <SidebarTrigger/> */}
        {status2component[noteGenerationState.noteGenerationStatus]}
      </div>
    </SidebarProvider>
  );
}

export default function CreateNotesPage() {
  return (
    <Suspense>
      <CreateNotesPageContent />
    </Suspense>
  );
}
