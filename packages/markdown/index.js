"use strict";

const markdownIt = require("markdown-it");
const markdownItSanitizer = require("markdown-it-sanitizer");
const markdownItHighlightJs = require("markdown-it-highlightjs");
const markdownItEmoji = require("markdown-it-emoji");
const markdownItMark = require("markdown-it-mark");
const markdownItCheckbox = require("markdown-it-checkbox");

const lineNumber = (md) => {
  md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token != null && token.map != null) {
      const index = token.map[0];
      if (index >= 0) {
        tokens[idx].attrSet("data-mdln", `${index + 1}`);
      }
    }
    return self.renderToken(tokens, idx, options);
  };
};

const md = markdownIt({html: true, xhtmlOut: true, breaks: true, linkify: true})
  .use(markdownItSanitizer)
  .use(markdownItHighlightJs, {auto: false})
  .use(markdownItEmoji)
  .use(markdownItMark)
  .use(markdownItCheckbox, {disabled: null, idPrefix: "checkbox_", ulClass: null, liClass: null})
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

const convert = (text) => {
  const html = md.render(text).replace(/<img /g, '<img style="max-width:100%;object-fit:contain;" ').trim();

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

module.exports = {convert}
