import { ExtractedComment } from '@piyoppi/cron2json-comment-generator'

export interface CommentExtractor {
  readonly extensions: string[]
  extractDocComment: (text: string) => ExtractedComment
}

export const extractCommentBlock = (text: string, commentChar: string) => {
  let hasEndOfComment = false
  const commentCharEscaped = commentChar.replace('/', '\/')
  const removeCommentCharRegExp = new RegExp(`^( |　|\^t|(${commentCharEscaped}))*`, 'g')

  return text.split(/[(\r\n)|\n]/g)
    .map(line => line.replace(/^( |　|\^t)*/g, '').replace(/(\r\n)|\n$/g, ''))
    .filter(line => {
    if (
      hasEndOfComment ||
      (line.length === 0)
    ) return false

    if (line.substring(0, commentChar.length) === commentChar) {
      return true
    }

    hasEndOfComment = true

    return false
  })
  .map(line => line.replace(removeCommentCharRegExp, ''))
}
