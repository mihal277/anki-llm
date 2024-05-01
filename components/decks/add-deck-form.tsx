"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AnkiDeck } from "@/app/anki/deck";
import { Language } from "@/app/language";
import { Input } from "@/components/ui/input";
import { DECKS_STORAGE_KEY, addToStorage } from "@/app/storage";

const FormSchema = z.object({
  deckName: z.string({
    required_error: "Deck name is required",
  }),
  language: z.nativeEnum(Language, {
    required_error: "Language is required",
  }),
});

interface AnkiDeckFormProps {
  ankiDecks: AnkiDeck[];
  setAnkiDecks: (ankiDecks: AnkiDeck[]) => void;
  setOpen: (open: boolean) => void;
}

export function AddDeckForm({
  ankiDecks,
  setAnkiDecks,
  setOpen,
}: AnkiDeckFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newDeck: AnkiDeck = {
      id: uuid(),
      name: data.deckName,
      language: data.language,
      notes: [],
    };
    const updatedDecks = [...ankiDecks, newDeck];
    setAnkiDecks(updatedDecks);
    addToStorage(DECKS_STORAGE_KEY, updatedDecks);

    setOpen(false);

    toast({
      title: "Deck created!",
      description: (
        <div className="flex flex-col mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <div>
            <span className="text-white">Name: </span>
            <span className="text-white font-bold">{data.deckName}</span>
          </div>
          <div>
            <span className="text-white">Language: </span>
            <span className="text-white font-bold">{data.language}</span>
          </div>
        </div>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="deckName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deck name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language of your deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Language).map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
