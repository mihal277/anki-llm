import OpenAI from 'openai';
import fs from "fs";
import fetch from "node-fetch";
import { text } from 'stream/consumers';



const prompt = `
You are a Spanish learner's dictionary 
(one with easy definictinos and example sentences) 
that produces JSON data only. 
For the Spanish word conocer, with the meaning "wiedzieć" 
(this meaning might be provided in another language). 
Provide the following data in a JSON format:

IPA_PRONUNCIATION - the pronunciation of the word in the International Phonetic Alphabet (example for tener: teˈner)
EASY_DEFINITINON_IN_SPANISH - a simple definition of the word in Spanish.
SIMPLE_EXAMPLE_SENTENCE - a simple example sentence in Spanish using the word, ideally in infinitive form.

Make sure everything uses only easy words.
Use the following JSON format:

{"pronunciation": IPA_PRONUNCIATION, "definition": EASY_DEFINITINON_IN_SPANISH, example_sentence: SIMPLE_EXAMPLE_SENTENCE}
`


const ipa_pronuncation_description = 'the pronunciation of the word in the International Phonetic Alphabet'
const easy_definition_in_spanish_description = 'a simple definition of the word in Spanish.'
const simple_example_sentence_description = 'a simple example sentence in Spanish using the word. Ideally, use the basic form of the word.'


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});





async function generateAudioPlayHT(textInput: string) {
  
  const axios = require('axios');

  let convertTranscribe = async () => {
    let url = "https://api.play.ht/api/v1/convert";

    let payload = {
      content: [
        textInput
      ],
      voice: "Isabella"
    };
    
    let headers = {
      "accept": "audio/mpeg",
      "content-type": "application/json",
      "AUTHORIZATION": process.env.PLAY_HT_KEY,
      "X-USER-ID": process.env.PLAY_HT_USER_ID
    };

    let response = await axios.post(url, payload, {headers});
    let responseDecoded = response.data;
    console.log(responseDecoded);

    let pollUrl = `https://api.play.ht/api/v1/articleStatus?transcriptionId=${responseDecoded.transcriptionId}`;
    
    let poll = async () => {
      let res = await axios.get(pollUrl, {headers});
      let resDecoded = res.data;

      console.log(resDecoded);

      if (resDecoded.converted) {
        console.log(resDecoded.audioUrl);
      } else {
        setTimeout(poll, 1000);
      }
    };

    poll();
  };

  convertTranscribe();
}


async function generateAudioElevenLabs(textInput: string) {
  const ElevenLabs = require("elevenlabs-node");
  const voice = new ElevenLabs(
      {
          apiKey:  process.env.ELEVEN_LABS_KEY,
          voiceId: "pNInz6obpgDQGcFmaJgB",
      }
  );

  voice.textToSpeech({
    fileName: "audio.mp3",
    textInput: textInput,
    modelId: "eleven_multilingual_v2",
  }).then((res: Response) => {
    console.log(res);
  });
}

async function main(word: string, meaning: string) {

  const prompt_functions = `
    You produce Anki cards for Spanish learners.
    You act as a Spanish learner's dictionary (one with easy definictinos and example sentences).

    Create an Anki card for the Spanish word "${word}", with the meaning "${meaning}".
    (this meaning might be provided in another language).


    When providing the pronunciation, here are some examples:
    tener: [teˈner],
    vista: [ˈbista],
    enseguida: [enseˈɣiða],
    conseguir: [konseˈɣir]
    They are taken from a dictionary.
  `;

  const messages = [
    { role: "user", content: prompt_functions },
  ];
  const tools = [
    {
      type: "function",
      function: {
        name: "create_anki_card",
        description: "Creates an Anki card with the provided data.",
        parameters: {
          type: "object",
          properties: {
            ipa_pronuncation: {
              type: "string",
              description: ipa_pronuncation_description,
            },
            easy_definition_in_spanish: {
              type: "string",
              description: easy_definition_in_spanish_description,
            },
            simple_example_sentence: {
              type: "string",
              description: simple_example_sentence_description,
            },
          },
          required: ["ipa_pronuncation", "easy_definition_in_spanish", "simple_example_sentence"],
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    tools: tools,
    tool_choice: "auto",
  });
  const responseMessage = response.choices[0].message;

  const toolCalls = responseMessage.tool_calls;
  if (responseMessage.tool_calls) {

    const toolCall = responseMessage.tool_calls[0];
    const functionArgs = JSON.parse(toolCall.function.arguments);

    return functionArgs;
  }
  else {
    throw Error("No tool calls found in response.");
  
  }
}


export default async function Home() {

  const x = await main("pescar", "łowić ryby");
  console.log(x);
  // generateAudioElevenLabs("Es importante conocer las reglas del juego antes de empezar a jugar.")
  // const voices = await getVoicesResembleAI();
  // console.log(voices);
  // await generateAudioPlayHT("Es importante conocer las reglas del juego antes de empezar a jugar.")
  return <h1>Hello, Home page!</h1>
}

