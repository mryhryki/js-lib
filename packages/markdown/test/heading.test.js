const {convertTest} = require("./common");

describe("Heading", () => {
  it("<h1>", () => convertTest("# H1", "<h1>H1</h1>"));
});
