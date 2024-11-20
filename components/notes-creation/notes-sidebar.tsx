import { Download, MoreHorizontal, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/app/db/db";
import { AnkiNote } from "@/app/anki/note";
import { deleteAllNotesFromDeck, deleteNote, getDeck } from "@/app/db/queries";
import {
  NoteGanarationStatus,
  NoteGenerationState,
} from "@/app/create-notes/page";
import { handleDownloadAnkiDeck } from "@/app/create-notes/download-notes";
import { DeleteAllNotesAlert } from "@/app/create-notes/delete-all-notes-alert";
import { useEffect, useState } from "react";
import { AnkiDeck } from "@/app/anki/deck";

const getNumberOfCards = (ankiNote: AnkiNote): number => {
  return ankiNote.cards.filter((card) => card.selected_for_export === true)
    .length;
};

interface GeneratedNotesSidebarProps {
  noteGenerationState: NoteGenerationState;
  setNoteGenerationState: (noteGenerationState: NoteGenerationState) => void;
}

export function GeneratedNotesSidebar({
  noteGenerationState,
  setNoteGenerationState,
}: GeneratedNotesSidebarProps) {
  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);

  const [deck, setDeck] = useState<AnkiDeck | undefined>(undefined);

  useEffect(() => {
    async function fetchDeck() {
      const fetchedDeck = await getDeck(deckId);
      setDeck(fetchedDeck);
    }

    fetchDeck();
  }, []);

  const ankiNotes = useLiveQuery(() =>
    db.ankiNotes.where("ankiDeckId").equals(deckId).toArray(),
  );

  const numberOfNotes = ankiNotes?.length;
  const numberOfSelectedCards = ankiNotes?.reduce(
    (total, note) => total + getNumberOfCards(note),
    0,
  );

  return (
    // this is a small hack to make the sidebar work with the header.
    // todo: implement a proper solution, https://github.com/shadcn-ui/ui/issues/5629
    <Sidebar className="top-[3.5rem]">
      <SidebarHeader>
        {deck?.name ? deck.name : "Loading..."} |{" "}
        {deck?.language ? deck.language : "Loading..."} | Notes:{" "}
        {numberOfNotes ? numberOfNotes : 0} | Cards:{" "}
        {numberOfSelectedCards ? numberOfSelectedCards : 0}
        <div
          className="flex flex-row gap-2 cursor-pointer"
          onClick={() => handleDownloadAnkiDeck(deckId)}
        >
          <Download />
          Download all
        </div>
        <DeleteAllNotesAlert
          onDeleteAllNotesFromGivenDeck={() => deleteAllNotesFromDeck(deckId)}
          triggerElement={
            <div className="flex flex-row gap-2 cursor-pointer">
              <Trash2 />
              Delete all
            </div>
          }
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ankiNotes?.map((ankiNote: AnkiNote, i: number) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild>
                    <span>
                      {ankiNote.wordOrExpression} | {getNumberOfCards(ankiNote)}
                    </span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        onClick={() =>
                          setNoteGenerationState({
                            ...noteGenerationState,
                            noteGenerationStatus:
                              NoteGanarationStatus.EditPreviouslySaved,
                            generatedNote: ankiNote,
                          })
                        }
                      >
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteNote(ankiNote.id!!)}
                      >
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
