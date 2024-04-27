"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import lscache from "lscache";
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

const OPEN_AI_LSCACHE_KEY = "openAIKey";
const PLAY_HT_USER_ID_LSCACHE_KEY = "playHtUserId";
const PLAY_HT_KEY_LSCACHE_KEY = "playHtKey";

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
      openAIKey: lscache.get(OPEN_AI_LSCACHE_KEY) ?? "",
      playHtUserId: lscache.get(PLAY_HT_USER_ID_LSCACHE_KEY) ?? "",
      playHtKey: lscache.get(PLAY_HT_KEY_LSCACHE_KEY) ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    lscache.set(OPEN_AI_LSCACHE_KEY, values.openAIKey);
    lscache.set(PLAY_HT_USER_ID_LSCACHE_KEY, values.playHtUserId);
    lscache.set(PLAY_HT_KEY_LSCACHE_KEY, values.playHtKey);
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
