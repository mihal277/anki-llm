"use client";

import { NotesCreationInputForm } from "@/components/notes-creation/input-form";
import { Suspense, useState } from "react";
import { AnkiNote } from "@/app/anki/note";
import { AnkiCardsPicker } from "@/components/notes-creation/anki-cards-picker";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GeneratedNotesSidebar } from "@/components/notes-creation/notes-sidebar";
import { useSearchParams } from "next/navigation";

export enum NoteGanarationStatus {
  NotGenerated = "GenerationNotRequestedYet",
  GenerationRunning = "GenerationRunning",
  ShowGenerated = "ShowGenerated",
  EditPreviouslySaved = "EditPreviouslySaved",
}

const showCardsPickerStatuses = [
  NoteGanarationStatus.ShowGenerated,
  NoteGanarationStatus.EditPreviouslySaved,
];

export interface NoteGenerationState {
  noteGenerationStatus: NoteGanarationStatus;

  wordOrExpression: string | undefined;
  meaning: string | undefined;
  generatedNote: AnkiNote | undefined;
}

function CreateNotesPageContent() {
  const [noteGenerationState, setNoteGenerationState] =
    useState<NoteGenerationState>({
      noteGenerationStatus: NoteGanarationStatus.NotGenerated,
      wordOrExpression: undefined,
      meaning: undefined,
      generatedNote: undefined,
    });

  return (
    <SidebarProvider>
      <GeneratedNotesSidebar
        noteGenerationState={noteGenerationState}
        setNoteGenerationState={setNoteGenerationState}
      />
      <div>
        {/* uncomment if there's a proper solution, see https://github.com/shadcn-ui/ui/issues/5629 */}
        {/* <SidebarTrigger/> */}
        {noteGenerationState.noteGenerationStatus ===
        NoteGanarationStatus.NotGenerated ? (
          <NotesCreationInputForm
            setNoteGenerationState={setNoteGenerationState}
          />
        ) : (
          showCardsPickerStatuses.includes(
            noteGenerationState.noteGenerationStatus,
          ) && (
            <AnkiCardsPicker
              noteGenerationState={noteGenerationState}
              setNoteGenerationState={setNoteGenerationState}
            />
          )
        )}
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
