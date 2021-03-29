interface Options {
  includeMarkdownText?: boolean;
}

interface ConvertResult {
  title: string;
  html: string;
}

export function convert(markdown: string): ConvertResult;
export function convert(markdown: string, options: Options): ConvertResult;
