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
import { Language } from "@/app/language";
import { AnkiNote } from "@/app/anki/note";

const FormSchema = z.object({
  wordOrExpression: z.string().min(1, {
    message: "Word or expression is required",
  }),
  definition: z.string().min(1, {
    message: "Definition is required",
  }),
});

interface NotesCreationInputFormProps {
  setIsGenerationRunning: (isRunning: boolean) => void;
  setGeneratedNote: (ankiNote: AnkiNote) => void;
}

export function NotesCreationInputForm({
  setIsGenerationRunning,
  setGeneratedNote,
}: NotesCreationInputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wordOrExpression: "",
      definition: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsGenerationRunning(true);
    const ankiNote = await generateAnkiNote(
      data.wordOrExpression,
      data.definition,
      Language.Spanish,
    );
    setIsGenerationRunning(false);
    setGeneratedNote(ankiNote);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
