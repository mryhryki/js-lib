import {Token} from "./models/token";
import {genStrongElement, genTextElement, matchWithStrongRegExp} from "./lexer";

const rootToken: Token = {
  id: 0,
  elmType: 'root',
  content: '',
  parent: {} as Token
}

export const parse = (markdownRow: string): Token[] => {
  return tokenizeText(markdownRow);
}

const tokenizeText = (textElement: string, initialId: number = 0, initialRoot: Token = rootToken): Token[] => {
  let elements: Token[] = [];
  let parent: Token = initialRoot;

  let id = initialId;

  const tokenize = (originalText: string, p: Token) => {
    let processingText = originalText;
    parent = p;
    // その行が空文字になるまで処理を繰り返す
    while (processingText.length !== 0) {
      const matchArray = matchWithStrongRegExp(processingText)

      if (matchArray == null) {
        id += 1;
        const onlyText = genTextElement(id, processingText, parent);
        processingText = '';
        elements.push(onlyText);

      } else {
        if (Number(matchArray.index) > 0) {
          // "aaa**bb**cc" -> TEXT Token + "**bb**cc" にする
          const text = processingText.substring(0, Number(matchArray.index))
          id += 1;
          const textElm = genTextElement(id, text, parent);
          elements.push(textElm);
          // 処理中のテキストからトークンにしたテキストを削除する
          processingText = processingText.replace(text, '');
        }

        id += 1;
        const elm = genStrongElement(id, '', parent)

        // Set the outer element to parent
        parent = elm;
        elements.push(elm);

        // 処理中のテキストからトークンにしたテキストを削除する
        processingText = processingText.replace(matchArray[0], '');

        // 再帰で掘る
        tokenize(matchArray[1], parent);
        parent = p;
      }
    }
  }

  tokenize(textElement, parent);
  return elements;
}
