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
import { ExternalService } from "@/app/db/db";
import {
  getExternalServiceAPIKey,
  putExternalServiceAPIKey,
} from "@/app/db/queries";
import { useEffect } from "react";

const formSchema = z.object({
  openAIKey: z.string().min(50, {
    message: "Open AI API key too short.",
  }),
  elevenLabsAPIKey: z
    .string()
    .min(50, {
      message: "Elevenlabs API key too short",
    })
    .optional()
    .or(z.literal("")),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openAIKey: "",
      elevenLabsAPIKey: "",
    },
  });

  useEffect(() => {
    async function fetchAPIKeys() {
      const openAIKey =
        (await getExternalServiceAPIKey(ExternalService.OpenAI)) ?? "";
      const elevenLabsAPIKey =
        (await getExternalServiceAPIKey(ExternalService.ElevenLabs)) ?? "";

      form.reset({
        openAIKey: openAIKey,
        elevenLabsAPIKey: elevenLabsAPIKey,
      });
    }

    fetchAPIKeys();
  }, []); // eslint-disable-line

  function onSubmit(values: z.infer<typeof formSchema>) {
    putExternalServiceAPIKey(ExternalService.OpenAI, values.openAIKey);
    if (values.elevenLabsAPIKey !== undefined)
      putExternalServiceAPIKey(
        ExternalService.ElevenLabs,
        values.elevenLabsAPIKey,
      );
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
