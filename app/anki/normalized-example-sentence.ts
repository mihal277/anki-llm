const errorMsg = [
  "Invalid sentence format.",
  "Sentence must contain exactly one occurrence of <w> and </w>",
  "delimiters with <w> appearing before </w>.",
].join(" ");

const startToken = "<w>";
const endToken = "</w>";

export function getNormalizedExampleSentenceWithWordTokens(
  sentence: string,
): string {
  const startCount = sentence.split(startToken).length - 1;
  const endCount = sentence.split(endToken).length - 1;
  if (startCount !== 1 || endCount !== 1) throw new Error(errorMsg);

  const startIndex = sentence.indexOf(startToken);
  const endIndex = sentence.indexOf(endToken);

  if (startIndex >= endIndex) throw new Error(errorMsg);

  const prefix = sentence.substring(0, startIndex);
  const wordOrExpression = sentence.substring(
    startIndex + startToken.length,
    endIndex,
  );
  const suffix = sentence.substring(endIndex + endToken.length);

  return [
    prefix.trimStart(),
    startToken,
    wordOrExpression.trim(),
    endToken,
    suffix.trimEnd(),
  ].join("");
}

export function getNormalizedExampleSentence(sentence: string): string {
  const normalizedSentence =
    getNormalizedExampleSentenceWithWordTokens(sentence);
  return normalizedSentence.replace("<w>", "").replace("</w>", "");
}

export function getNormalizedExampleSentenceWithBoldWord(
  sentence: string,
): string {
  const normalizedSentence =
    getNormalizedExampleSentenceWithWordTokens(sentence);
  return normalizedSentence.replace("<w>", "<b>").replace("</w>", "</b>");
}

export function getNormalizedExampleSentenceWithWordUnderscored(
  sentence: string,
): string {
  const normalizedSentence =
    getNormalizedExampleSentenceWithWordTokens(sentence);

  const startIndex = normalizedSentence.indexOf(startToken);
  const endIndex = normalizedSentence.indexOf(endToken);

  const wordOrExpression = normalizedSentence.substring(
    startIndex + startToken.length,
    endIndex,
  );

  const underscoredWithSpaces = wordOrExpression.replace(/\S/g, "_");

  return [
    normalizedSentence.substring(0, startIndex),
    underscoredWithSpaces,
    normalizedSentence.substring(endIndex + endToken.length),
  ].join("");
}
