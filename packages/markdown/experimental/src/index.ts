import {parse} from "./parser";
import {generate} from "./generator";

export const convertToHtmlString = (markdown: string): string => {
  const mdArray = markdown.split(new RegExp('(\r\n|\r|\n)'));
  return generate(mdArray.map(md => parse(md)))
}
