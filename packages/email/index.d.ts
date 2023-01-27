export interface ParseEmailResult {
  messageId: string
  date: string
  subject: string
  to: string[]
  from: string | null
  cc: string[]
  replyTo: string | null
  headers: Record<string, string | null | undefined>
  attachments: { filename: string, contentType: string }[],
  html: string[]
  text: string[]
}

export type parseEmail = (emlRawData: string) => Promise<ParseEmailResult>
