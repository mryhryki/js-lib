interface ConvertResult {
  title: string;
  html: string;
}

export function convert(markdown: string): ConvertResult;
