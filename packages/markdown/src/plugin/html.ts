import { Plugin } from "unified";
import { Node } from "unified/lib";
import { VFileCompatible } from "vfile";
import { visit } from "unist-util-visit";

// https://unifiedjs.com/learn/guide/create-a-plugin/#plugin
export const htmlPlugin: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    visit(tree, "element", (node: any /* FIXME */) => {
      // console.debug("[MARKDOWN]", JSON.stringify({ node }, null, 2));
      if (node.tagName === "li") {
        const checkboxNode = node.children.find(
          (child) => child.tagName === "input" && child.properties.type === "checkbox"
        );
        if (checkboxNode == null) return;
        delete node.properties.className;
        node.children = node.children.filter((child) => !(child.type === "text" && child.value === " "));
        node.properties["data-mdln"] = node.position.start.line;
        delete checkboxNode.properties["disabled"];
      }
    });
  };
};
