export class NormalizedExampleSentence {
  sentence: string;

  errorMsg = [
    "Invalid sentence format.",
    "Sentence must contain exactly one occurrence of <w> and </w>",
    "delimiters with <w> appearing before </w>.",
  ].join(" ");

  startToken = "<w>";
  endToken = "</w>";

  constructor(sentence: string) {
    const startCount = sentence.split(this.startToken).length - 1;
    const endCount = sentence.split(this.endToken).length - 1;

    if (startCount !== 1 || endCount !== 1) throw new Error(this.errorMsg);

    const startIndex = sentence.indexOf(this.startToken);
    const endIndex = sentence.indexOf(this.endToken);

    if (startIndex >= endIndex) throw new Error(this.errorMsg);

    const prefix = sentence.substring(0, startIndex);
    const wordOrExpression = sentence.substring(
      startIndex + this.startToken.length,
      endIndex,
    );
    const suffix = sentence.substring(endIndex + this.endToken.length);

    this.sentence = [
      prefix.trimStart(),
      this.startToken,
      wordOrExpression.trim(),
      this.endToken,
      suffix.trimEnd(),
    ].join("");
  }

  getWithoutWordTokens() {
    return this.sentence.replace("<w>", "").replace("</w>", "");
  }

  getAsHTMLBold() {
    return this.sentence.replace("<w>", "<b>").replace("</w>", "</b>");
  }

  getWithInsideOfTokensReplacedWithUnderscores() {
    const startIndex = this.sentence.indexOf(this.startToken);
    const endIndex = this.sentence.indexOf(this.endToken);

    const wordOrExpression = this.sentence.substring(
      startIndex + this.startToken.length,
      endIndex,
    );

    const underscoredWithSpaces = wordOrExpression.replace(/\S/g, "_");

    return [
      this.sentence.substring(0, startIndex),
      underscoredWithSpaces,
      this.sentence.substring(endIndex + this.endToken.length),
    ].join("");
  }
}
