import { Plugin } from "unified";
import { Node } from "unified/lib";
import { VFileCompatible } from "vfile";

export const htmlPlugin: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    console.debug("[HTML]", JSON.stringify({ tree }, null, 2));
  };
};
