export const shortSentences = (paragraph, numOfWords) => {
  const words = paragraph.split(" ");

  if (words.length <= numOfWords) {
    return paragraph;
  }

  // If there are more than numOfWords words, slice the array to get the first numOfWords words
  const limitedWords = words.slice(0, numOfWords);

  // Join the limited words back into a paragraph with spaces
  const limitedParagraph = limitedWords.join(" ");

  return `${limitedParagraph}...`;
};
