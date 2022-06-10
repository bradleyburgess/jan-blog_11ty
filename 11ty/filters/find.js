const findFilter = (array, key, value, caseInsensitive = true) =>
  array.find((elem) => elem[key].toLowerCase() === value.toLowerCase());

module.exports = findFilter;
