const { DateTime } = require("./index");
// Parse from DateTime text
const datetime = DateTime.parse("2022-01-16T17:32:39+09:00");

// Get ISO8601 format text
console.log(datetime.toString());
