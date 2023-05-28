import { describe, it } from "vitest";
import { convert } from "../src";

describe("title", () => {
  it("is key:value", async ({ expect }) => {
    const title = "TITLE";
    const markdown = `# HEADER1\n\ntitle: ${title}`;
    expect((await convert(markdown)).title).toEqual(title);
  });
  it("has heading", async ({ expect }) => {
    const title = "TITLE";
    for await (const prefix of ["#", "##", "###", "####", "#####", "######"]) {
      const markdown = `${prefix} ${title}`;
      expect((await convert(markdown)).title).toEqual(title);
    }
  });

  it("no heading", async ({ expect }) => {
    const title = "TITLE";
    const markdown = ["", title].join("\n");
    expect((await convert(markdown)).title).toEqual(title);
  });

  it("has Link", async ({ expect }) => {
    const title = "TITLE";
    const markdown = `[${title}](https://example.com/)`;
    expect((await convert(markdown)).title).toEqual(title);
  });
});
