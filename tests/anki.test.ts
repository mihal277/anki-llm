import {
  getNormalizedExampleSentence,
  getNormalizedExampleSentenceWithBoldWord,
  getNormalizedExampleSentenceWithWordTokens,
  getNormalizedExampleSentenceWithWordUnderscored,
} from "@/app/anki/normalized-example-sentence";

const errorMsg = [
  "Invalid sentence format.",
  "Sentence must contain exactly one occurrence of <w> and </w>",
  "delimiters with <w> appearing before </w>.",
].join(" ");

describe("test normalizing example sentences", () => {
  test("getNormalizedExampleSentenceWithWordTokens - correct sentence", () => {
    expect(
      getNormalizedExampleSentenceWithWordTokens("I have <w>an apple</w>."),
    ).toBe("I have <w>an apple</w>.");
  });

  test("getNormalizedExampleSentenceWithWordTokens - no closing token", () => {
    expect(() => {
      getNormalizedExampleSentenceWithWordTokens("I have <w>an apple.");
    }).toThrow(Error(errorMsg));
  });

  test("getNormalizedExampleSentenceWithWordTokens - normalizing whitespace", () => {
    expect(
      getNormalizedExampleSentenceWithWordTokens(" I have <w> an apple </w>. "),
    ).toBe("I have <w>an apple</w>.");
  });

  test("getNormalizedExampleSentenceWithWordTokens - no starting token", () => {
    expect(() => {
      getNormalizedExampleSentenceWithWordTokens("I have an apple</w>.");
    }).toThrow(Error(errorMsg));
  });

  test("getNormalizedExampleSentenceWithWordTokens - no tokens", () => {
    expect(() => {
      getNormalizedExampleSentenceWithWordTokens("I have an apple.");
    }).toThrow(Error(errorMsg));
  });

  test("getNormalizedExampleSentenceWithWordTokens - closing token before opening", () => {
    expect(() => {
      getNormalizedExampleSentenceWithWordTokens("I have </w>an apple<w>.");
    }).toThrow(Error(errorMsg));
  });

  test("getNormalizedExampleSentenceWithWordTokens -  incorrect token", () => {
    expect(() => {
      getNormalizedExampleSentenceWithWordTokens("I have <e>an apple</e>.");
    }).toThrow(Error(errorMsg));
  });

  test("getNormalizedExampleSentence", () => {
    const sentence = getNormalizedExampleSentence("I have <w>an apple</w>.");
    expect(sentence).toBe("I have an apple.");
  });

  test("getNormalizedExampleSentenceWithWordUnderscored", () => {
    const sentence = getNormalizedExampleSentenceWithWordUnderscored(
      "I have <w>an apple</w>.",
    );
    expect(sentence).toBe("I have __ _____.");
  });

  test("getNormalizedExampleSentenceWithBoldWord", () => {
    const sentence = getNormalizedExampleSentenceWithBoldWord(
      "I have <w>an apple</w>.",
    );
    expect(sentence).toBe("I have <b>an apple</b>.");
  });
});
