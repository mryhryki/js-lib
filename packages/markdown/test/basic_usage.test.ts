import { readFile } from "fs/promises";
import { resolve } from "path";
import { describe, it } from "vitest";
import { convert } from "../src";

describe("Convert Markdown", () => {
  it("Basic Usage", async ({ expect }) => {
    const markdown = (await readFile(resolve(__dirname, "./files/source.markdown.txt"))).toString("utf-8");
    const html = (await readFile(resolve(__dirname, "./files/expect.html.txt"))).toString("utf-8");
    expect((await convert(markdown)).html.trim()).toEqual(html.trim());
  });
});
