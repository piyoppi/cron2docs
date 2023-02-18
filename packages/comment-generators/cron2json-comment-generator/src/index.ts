export type ExtractedComment = {
  title?: string,
  summary?: string,
  raw: string
}

export interface CommentGenerator {
  generate: (command: string) => ExtractedComment | null
}
