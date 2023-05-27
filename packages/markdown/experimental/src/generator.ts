import {Token} from "./models/token";
import {MergedToken} from "./models/merged_token";

export const generate = (asts: Token[][]): string => {
  const htmlStrings: string[] = asts.map((lineTokens: Token[]): string => {
    let rearrangedAst: (Token|MergedToken)[] = lineTokens.reverse()
    // 全てのトークンがRootの下に付くまでマージを繰り返す
    while(!isAllElmParentRoot(rearrangedAst)) {
      let index = 0;
      while (index < rearrangedAst.length) {
        if (rearrangedAst[index].parent?.elmType === 'root') {
          // Root の下にあるトークンの場合何もしない
          index++;
        } else {
          const currentToken = rearrangedAst[index];
          rearrangedAst = rearrangedAst.filter((_, i) => i !== index) // Remove current token
          const parentIndex = rearrangedAst.findIndex((t) => t.id === currentToken.parent.id);
          const parentToken = rearrangedAst[parentIndex];
          const mergedToken: MergedToken = {
            id: parentToken.id,
            elmType: 'merged',
            content: createMergedContent(currentToken, parentToken),
            parent: parentToken.parent,
          }
          rearrangedAst.splice(parentIndex, 1, mergedToken);
          // parent とマージする
          // つまり2つ変更する。子は削除・親は置き換え。
          // 1つ親と合成したら1つ要素を消す。のでindexは変わらず。なのでマージしないときのみindex++をする
        }
      }
    }
    return _generateHtmlString(rearrangedAst)
  })
  return htmlStrings.join("")
}

const isAllElmParentRoot = (tokens: (Token | MergedToken)[]): boolean => {
  return tokens.every((token) => token.parent?.elmType === 'root');
}

const getInsertPosition = (content: string): number => {
  let state = 0;
  const closeTagParentheses = ['<', '>'];
  let position = 0;
  content.split('').some((c, i) => {
    if (state === 1 && c === closeTagParentheses[state]) {
      position = i;
      return true;
    } else if (state === 0 && c === closeTagParentheses[state]) {
      state++
    }
    return false;
  })
  return position + 1;
}

const createMergedContent = (currentToken: Token | MergedToken, parentToken: Token | MergedToken): string => {
  let content = '';
  switch (parentToken.elmType) {
    case 'string':
      content = `<strong>${currentToken.content}</strong>`
      break;
    case 'merged':
      const position = getInsertPosition(parentToken.content);
      content = [
        parentToken.content.slice(0, position),
        currentToken.content,
        parentToken.content.slice(position)
      ].join("")
  }
  return content;
}

const _generateHtmlString = (tokens: (Token | MergedToken)[]): string => {
  return tokens.map((t) => t.content).reverse().join("");
}

