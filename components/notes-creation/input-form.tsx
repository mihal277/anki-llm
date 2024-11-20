"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateAnkiNote } from "@/app/anki/generate-note";
import {
  NoteGanarationStatus,
  NoteGenerationState,
} from "@/app/create-notes/page";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  wordOrExpression: z.string().min(1, {
    message: "Word or expression is required",
  }),
  definition: z.string().min(1, {
    message: "Definition is required",
  }),
});

interface NotesCreationInputFormProps {
  setNoteGenerationState: (noteGenerationState: NoteGenerationState) => void;
}

export function NotesCreationInputForm({
  setNoteGenerationState,
}: NotesCreationInputFormProps) {
  const searchParams = useSearchParams();
  const deckId = Number(searchParams.get("deckId")!!);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wordOrExpression: "",
      definition: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setNoteGenerationState({
      noteGenerationStatus: NoteGanarationStatus.GenerationRunning,
      wordOrExpression: data.wordOrExpression,
      meaning: data.definition,
      generatedNote: undefined,
    });
    const ankiNote = await generateAnkiNote(
      data.wordOrExpression,
      data.definition,
      deckId,
    );
    setNoteGenerationState({
      noteGenerationStatus: NoteGanarationStatus.ShowGenerated,
      wordOrExpression: data.wordOrExpression,
      meaning: data.definition,
      generatedNote: ankiNote,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="wordOrExpression"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Word or expression" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="definition"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Definition" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Create
        </Button>
      </form>
    </Form>
  );
}
