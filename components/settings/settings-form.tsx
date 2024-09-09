"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ELEVENLABS_API_KEY_STORAGE_KEY,
  OPEN_AI_STORAGE_KEY,
  addToStorage,
  getFromStorage,
} from "@/app/storage";

const formSchema = z.object({
  openAIKey: z.string().min(50, {
    message: "Open AI API key too short.",
  }),
  elevenLabsAPIKey: z
    .string()
    .length(32, {
      message: "Elevenlabs API key has 32 characters.",
    })
    .optional()
    .or(z.literal("")),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openAIKey: getFromStorage(OPEN_AI_STORAGE_KEY) ?? "",
      elevenLabsAPIKey: getFromStorage(ELEVENLABS_API_KEY_STORAGE_KEY) ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addToStorage(OPEN_AI_STORAGE_KEY, values.openAIKey);
    addToStorage(ELEVENLABS_API_KEY_STORAGE_KEY, values.elevenLabsAPIKey);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="openAIKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Open AI API key</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="elevenLabsAPIKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elevenlabs API key</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col max-w-max gap-1">
          <Button type="submit">Save</Button>
          {form.formState.isSubmitSuccessful && (
            <div className="flex flex-row gap-1">
              <span>Saved</span>
              <Check />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
