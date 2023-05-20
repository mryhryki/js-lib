const { convert } = require("../index");

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
      "<!-- COMMENT -->"
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
      '<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;foo&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-string">&quot;bar&quot;</span><span class="hljs-punctuation">}</span>',
      "</code></pre>",
    ].join("\n");

    expect(convert(markdown).html).toEqual(html);
  });
});
