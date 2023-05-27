"use strict";

import { unified } from "unified";
import parser from "remark-parse";
import mdast2hast from "remark-rehype";
import compiler from "rehype-stringify";

// const lineNumber = (md) => {
//   md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => {
//     const token = tokens[idx];
//     if (token != null && token.map != null) {
//       const index = token.map[0];
//       if (index >= 0) {
//         tokens[idx].attrSet("data-mdln", `${index + 1}`);
//       }
//     }
//     return self.renderToken(tokens, idx, options);
//   };
// };

const processor = unified() //
  .use(parser)
  .use(mdast2hast)
  .use(compiler)
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
