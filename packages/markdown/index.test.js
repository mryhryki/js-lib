const { convert } = require("./index");

describe("Convert Markdown", () => {
  it("Basic Usage", () => {
    const markdown = [
      "# Header1",
      "Paragraph :smile:",
      "",
      "https://example.com/path/index.html#hash?foo=bar",
      "",
      "![example](https://example.com/image.png)",
      "",
      "==MARK==",
      "",
      "- [ ] TODO",
      "- [x] DONE",
      "",
      "```json",
      '{"foo":"bar"}',
      "```",
    ].join("\n");

    const html = [
      "<h1>Header1</h1>",
      `<p>Paragraph ${String.fromCodePoint(0x1f604)}</p>`,
      '<p><a href="https://example.com/path/index.html#hash?foo=bar">https://example.com/path/index.html#hash?foo=bar</a></p>',
      '<p><img style="max-width:100%;object-fit:contain;" src="https://example.com/image.png" alt="example" /></p>',
      "<p><mark>MARK</mark></p>",
      "<ul>",
      '<li data-mdln="10"><input type="checkbox" id="checkbox_0" /><label for="checkbox_0">TODO</label></li>',
      '<li data-mdln="11"><input type="checkbox" id="checkbox_1" checked="true" /><label for="checkbox_1">DONE</label></li>',
      "</ul>",
      '<pre><code class="hljs language-json">{<span class="hljs-attr">&quot;foo&quot;</span>:<span class="hljs-string">&quot;bar&quot;</span>}',
      "</code></pre>",
    ].join("\n");

    expect(convert(markdown).html).toEqual(html);
  });
});

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
