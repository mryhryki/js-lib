"use strict";

import markdownIt from "markdown-it";
import markdownItSanitizer from "markdown-it-sanitizer";
import markdownItHighlightJs from "markdown-it-highlightjs";
import markdownItEmoji from "markdown-it-emoji";
import markdownItMark from "markdown-it-mark";
import markdownItCheckbox from "markdown-it-checkbox";
import { lineNumber } from "./line_number";

const md = markdownIt({ html: true, xhtmlOut: true, breaks: true, linkify: true })
  .use(markdownItSanitizer)
  .use(markdownItHighlightJs)
  .use(markdownItEmoji)
  .use(markdownItMark)
  .use(markdownItCheckbox, { disabled: null, idPrefix: "checkbox_", ulClass: null, liClass: null })
  .use(lineNumber);

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

interface Options {
  includeMarkdownText?: boolean;
}

interface ConvertResult {
  title: string;
  html: string;
}

export const convert = (text: string, options: Options = {}): ConvertResult => {
  const includeMarkdownText = options.includeMarkdownText != null ? options.includeMarkdownText : false;
  let html = md.render(text).replace(/<img /g, '<img style="max-width:100%;object-fit:contain;" ').trim();

  if (includeMarkdownText) {
    html = `${html}\n<p><details><summary>Markdown</summary><pre>${text}</pre></details></p>`;
  }

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
