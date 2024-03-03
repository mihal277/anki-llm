"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getNote as getNoteSpanish } from "./anki/spanish";
import { AnkiNote } from "./anki/note";
import { NormalizedExampleSentence } from "./anki/normalizedExampleSentence";

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

  //todo async
  const downloadMultipleFilesAndZipThem = async (
    expressionsToGenerate: string[],
  ) => {
    expressionsToGenerate = [
      "Yo soy un chico",
      "Espero que te mejores pronto.",
    ];

    const audioDataRequests = expressionsToGenerate.map(
      (expressionToGenerate) => {
        return {
          content: expressionToGenerate,
          language: "Spanish",
          mp3Name: `${uuid()}.mp3`,
        };
      },
    );

    console.log(audioDataRequests);

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
      <button
        onClick={downloadMultipleFilesAndZipThem}
        style={{
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        Download
      </button>

      <h2>Select language</h2>
      <button
        onClick={() => setLanguageStr("Spanish")}
        style={{
          fontWeight: languageStr === "Spanish" ? "bold" : "normal",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        Spanish
      </button>
      <br />

      <input
        type="text"
        value={playHTUserId}
        onChange={(e) => setPlayHTUserId(e.target.value)}
        placeholder="Enter play ht user id"
        style={{
          marginBottom: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      />

      <br />

      <input
        type="text"
        value={playHTKey}
        onChange={(e) => setPlayHTKey(e.target.value)}
        placeholder="Enter play ht key"
        style={{
          marginBottom: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      />

      <br />

      <input
        type="text"
        value={wordOrExpression}
        onChange={(e) => setWordOrExpression(e.target.value)}
        placeholder="Enter word"
        style={{
          marginBottom: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      />

      <br />

      <input
        type="text"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Enter definition"
        style={{
          marginBottom: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      />

      <br />

      <button onClick={onGenerateClick}>Generate</button>

      {ankiNote !== undefined && (
        <div>
          <h3>Flashcard Data:</h3>
          {ankiNote.cards.map((card, index) => (
            <div key={index}>
              <input
                type="text"
                value={card.front.contentHTML}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
              <input
                type="text"
                value={card.back.contentHTML}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
