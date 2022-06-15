const { convert } = require("../index");

module.exports.convertTest = (markdown, html) => {
  expect(convert(markdown).html).toEqual(html);
}
