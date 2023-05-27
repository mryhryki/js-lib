import { Token } from "./models/token"

const TEXT = 'text';
const STRONG = 'strong';

const STRONG_ELM_REGEXP = /\*\*(.*?)\*\*/

export const genTextElement = (id: number, text: string, parent: Token): Token => {
  return {
    id,
    elmType: TEXT,
    content: text,
    parent,
  }
}

export const genStrongElement = (id: number, text: string, parent: Token): Token => {
  return {
    id,
    elmType: STRONG,
    content: '',
    parent,
  }
}

export const matchWithStrongRegExp = (text: string): RegExpMatchArray | null => {
  return text.match(STRONG_ELM_REGEXP)
}
