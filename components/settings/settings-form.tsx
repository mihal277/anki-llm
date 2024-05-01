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
  OPEN_AI_STORAGE_KEY,
  PLAY_HT_KEY_STORAGE_KEY,
  PLAY_HT_USER_ID_STORAGE_KEY,
  addToStorage,
  getFromStorage,
} from "@/app/storage";

const formSchema = z.object({
  openAIKey: z.string().min(50, {
    message: "Open AI API key too short.",
  }),
  playHtUserId: z
    .string()
    .min(25, {
      message: "Play HT user id too short.",
    })
    .optional()
    .or(z.literal("")),
  playHtKey: z
    .string()
    .min(30, {
      message: "Play HT key too short.",
    })
    .optional()
    .or(z.literal("")),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openAIKey: getFromStorage(OPEN_AI_STORAGE_KEY) ?? "",
      playHtUserId: getFromStorage(PLAY_HT_USER_ID_STORAGE_KEY) ?? "",
      playHtKey: getFromStorage(PLAY_HT_KEY_STORAGE_KEY) ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addToStorage(OPEN_AI_STORAGE_KEY, values.openAIKey);
    addToStorage(PLAY_HT_USER_ID_STORAGE_KEY, values.playHtUserId);
    addToStorage(PLAY_HT_KEY_STORAGE_KEY, values.playHtKey);
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
          name="playHtUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Play.ht user ID</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playHtKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Play.ht key</FormLabel>
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
