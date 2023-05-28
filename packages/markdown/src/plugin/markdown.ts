import { Plugin } from "unified";
import { Node } from "unified/lib";
import { VFileCompatible } from "vfile";

// https://unifiedjs.com/learn/guide/create-a-plugin/#plugin
export const markdownPlugin: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    // console.debug("[MARKDOWN]", JSON.stringify({ tree }, null, 2));
  };
};
