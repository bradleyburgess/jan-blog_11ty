const { DateTime } = require("luxon");

module.exports = (input) => DateTime.fromJSDate(new Date(input)).toFormat("LLLL d, y");
