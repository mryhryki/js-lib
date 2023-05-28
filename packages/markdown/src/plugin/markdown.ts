import { Plugin } from "unified";
import { Node } from "unified/lib";
import { VFileCompatible } from "vfile";

export const markdownPlugin: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    console.debug("[MARKDOWN]", JSON.stringify({ tree }, null, 2));
  };
};
