export interface ParseEmailAddress {
  name: string | null
  address: string
}

export interface ParseEmailResult {
  messageId: string | null
  date: string | null
  subject: string
  to: ParseEmailAddress[]
  from: ParseEmailAddress
  cc: ParseEmailAddress[]
  replyTo: string | null
  headers: Record<string, string | null | undefined>
  attachments: { filename: string, contentType: string }[],
  html: string[]
  text: string[]
}

export function parseEmail(emlRawData: string): Promise<ParseEmailResult>;
