import { NormalizedExampleSentence } from "../app/anki/anki";

const errorMsg = [
  "Invalid sentence format.",
  "Sentence must contain exactly one occurrence of <w> and </w>",
  "delimiters with <w> appearing before </w>.",
].join(" ");

describe("test NormalizedExampleSentence", () => {
  test("constructor - correct sentence", () => {
    expect(
      new NormalizedExampleSentence("I have <w>an apple</w>.").sentence,
    ).toBe("I have <w>an apple</w>.");
  });

  test("constructor - no closing token", () => {
    expect(() => {
      new NormalizedExampleSentence("I have <w>an apple.");
    }).toThrow(Error(errorMsg));
  });

  test("constructor - normalizing whitespace", () => {
    expect(
      new NormalizedExampleSentence(" I have <w> an apple </w>. ").sentence,
    ).toBe("I have <w>an apple</w>.");
  });

  test("constructor - no starting token", () => {
    expect(() => {
      new NormalizedExampleSentence("I have an apple</w>.");
    }).toThrow(Error(errorMsg));
  });

  test("constructor - no tokens", () => {
    expect(() => {
      new NormalizedExampleSentence("I have an apple.");
    }).toThrow(Error(errorMsg));
  });

  test("constructor - closing token before opening", () => {
    expect(() => {
      new NormalizedExampleSentence("I have </w>an apple<w>.");
    }).toThrow(Error(errorMsg));
  });

  test("constructor -  incorrect token", () => {
    expect(() => {
      new NormalizedExampleSentence("I have <e>an apple</e>.");
    }).toThrow(Error(errorMsg));
  });

  test("getWithoutWordTokens", () => {
    const sentence = new NormalizedExampleSentence("I have <w>an apple</w>.");
    expect(sentence.sentence).toBe("I have <w>an apple</w>.");
  });

  test("getWithInsideOfDelimitersReplacedWithUnderscores", () => {
    const sentence = new NormalizedExampleSentence("I have <w>an apple</w>.");
    expect(sentence.getWithInsideOfDelimitersReplacedWithUnderscores()).toBe(
      "I have __ _____.",
    );
  });

  test("getAsHTMLBold", () => {
    const sentence = new NormalizedExampleSentence("I have <w>an apple</w>.");
    expect(sentence.getAsHTMLBold()).toBe("I have <b>an apple</b>.");
  });
});
