const { convert } = require("../index");

describe("title", () => {
  it("is key:value", () => {
    const title = "TITLE";
    const markdown = `# HEADER1\n\ntitle: ${title}`;
    expect(convert(markdown).title).toEqual(title);
  });
  it("has heading", () => {
    const title = "TITLE";
    ["#", "##", "###", "####", "#####", "######"].forEach((prefix) => {
      const markdown = `${prefix} ${title}`;
      expect(convert(markdown).title).toEqual(title);
    });
  });

  it("no heading", () => {
    const title = "TITLE";
    const markdown = ["", title].join("\n");
    expect(convert(markdown).title).toEqual(title);
  });

  it("has Link", () => {
    const title = "TITLE";
    const markdown = `[${title}](https://example.com/)`;
    expect(convert(markdown).title).toEqual(title);
  });
});
