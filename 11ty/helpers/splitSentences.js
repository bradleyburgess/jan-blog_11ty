const splitSentences = (input) =>
  input
    .trim()
    .split(". ")
    .map((item) => (item.endsWith(".") ? item : item + "."))
    .map((item, index, arr) => (index === arr.length - 1 ? item : item + " "));

module.exports = splitSentences;
