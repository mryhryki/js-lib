import MarkdownIt from "markdown-it";

export const lineNumber: MarkdownIt.PluginSimple = (md) => {
  md.renderer.rules.list_item_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token != null && token.map != null) {
      const index = token.map[0];
      if (index >= 0) {
        tokens[idx].attrSet("data-markdown-line-number", `${index + 1}`);
      }
    }
    return self.renderToken(tokens, idx, options);
  };
};
