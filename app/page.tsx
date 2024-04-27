"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getNote as getNoteSpanish } from "./anki/spanish";
import { AnkiNote } from "./anki/note";
import { NormalizedExampleSentence } from "./anki/normalizedExampleSentence";
import { AudioDataRequest } from "./audio";
import SettingsSheet from "@/components/settings/settings-sheet";
import { ModeToggle } from "@/components/mode-toggle";

function constructFlashCard1Front(word: string, flashCardData: any) {
  return `${flashCardData.easy_definition}`;
}

function constructFlashCard1Back(word: string, flashCardData: any) {
  return `
    ${word} ${flashCardData.ipa_pronuncation}
  `;
}

function constructFlashCard2Front(word: string, flashCardData: any) {
  return `${flashCardData.simple_example_sentence.replace("<w>", "").replace("</w>", "")}`;
}

function constructFlashCard2Back(word: string, flashCardData: any) {
  return `
    ${word} ${flashCardData.ipa_pronuncation}
  `;
}

export default function Home() {
  const [languageStr, setLanguageStr] = useState("");
  const [wordOrExpression, setWordOrExpression] = useState("");
  const [definition, setDefinition] = useState("");
  const [ankiNote, setAnkiNote] = useState<AnkiNote>();
  const [playHTUserId, setPlayHTUserId] = useState("");
  const [playHTKey, setPlayHTKey] = useState("");

  const downloadMultipleFilesAndZipThem = async (
    audioDataRequests: AudioDataRequest[],
  ) => {
    const response = await fetch("/api/generate_audio", {
      method: "POST",
      body: JSON.stringify({
        audioDataRequests: audioDataRequests,
        playHTUserId: playHTUserId,
        playHTKey: playHTKey,
      }),
    });
    const blob = await response.blob();
    saveAs(blob, "mp3s.zip");
  };

  const onGenerateClick = async () => {
    const response = await fetch("/api/generate_flashcard_data", {
      method: "POST",
      body: JSON.stringify({
        word_or_expression: wordOrExpression,
        meaning: definition,
        language_str: languageStr,
      }),
    });
    const { easy_definition, ipa_pronuncation, simple_example_sentence } =
      await response.json();
    const spanishNote = getNoteSpanish(
      wordOrExpression,
      ipa_pronuncation,
      easy_definition,
      new NormalizedExampleSentence(simple_example_sentence),
    );
    setAnkiNote(spanishNote);
  };

  return (
    <>
      <SettingsSheet />
      <ModeToggle />
    </>
  );
}
