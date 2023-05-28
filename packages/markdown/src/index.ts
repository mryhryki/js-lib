"use strict";

import { unified, Plugin } from "unified";
import { VFileCompatible } from "vfile";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkHighlightJs from "remark-highlight.js";
import remarkGfm from "remark-gfm";
import { htmlPlugin } from "./plugin/html";
import { markdownPlugin } from "./plugin/markdown";

const processor = unified() //
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkHighlightJs)
  .use(markdownPlugin)
  .use(remarkRehype)
  .use(htmlPlugin)
  .use(rehypeStringify, { closeSelfClosing: true })
  .freeze();

const TitleMatchers = [
  new RegExp("title: (.+)"),
  new RegExp("<h1>(.+)</h1>"),
  new RegExp("<h2>(.+)</h2>"),
  new RegExp("<h3>(.+)</h3>"),
  new RegExp("<h4>(.+)</h4>"),
  new RegExp("<h5>(.+)</h5>"),
  new RegExp("<h6>(.+)</h6>"),
  new RegExp("(.+)"),
];

const TagMatcher = new RegExp("<\\/?[^>]+>", "g");

export const convert = async (text) => {
  const result = await processor.process(text);
  const html: string = result.toString("utf-8");

  let title = "NoTitle";
  for (const matcher of TitleMatchers) {
    const matched = html.match(matcher);
    if (matched != null) {
      title = matched[1].replace(TagMatcher, "").trim();
      break;
    }
  }

  return {
    title,
    html,
  };
};
