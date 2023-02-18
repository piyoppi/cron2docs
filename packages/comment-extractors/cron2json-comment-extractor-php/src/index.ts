import { CommentExtractor, extractCommentBlock } from '@piyoppi/cron2json-comment-extractor'

export class PhpCommentExtractor implements CommentExtractor {
  constructor(
    private _extensions: string[],
  ) {
  }

  get extensions() {
    return this._extensions
  }

  extractDocComment(content: string) {
    return this.extractComment(content)
  }

  private extractHashCommentBlock(content: string) {
    return extractCommentBlock(content.replace('<?php\n', ''), '#')
  }

  private extractSlashCommentBlock(content: string) {
    return extractCommentBlock(content.replace('<?php\n', ''), '//')
  }

  private extractMultilineCommentBlock(content: string) {
    let state: 'none' | 'start' | 'end' = 'none'

    const result = content.replace('<?php\n', '')
      .split(/[(\r\n)|\n]/g)
      .map(line => line.replace(/^( |　|\^t)*/g, '').replace(/(\r\n)|\n$/g, ''))
      .filter(line => {
        if (
          state === 'end'
        ) return false

        if (state === 'none' && line.substring(0, 2) === '/*') {
          state = 'start'
          return false
        }

        if (state === 'start') {
          if (line.match(/\*\/.*$/g)) {
            state = 'end'
            return false
          }

          return true
        }
      })

    const removeBeginningChar = result.reduce((acc, val) => val[0] === '*' ? acc + 1 : acc, 0)

    if (removeBeginningChar >= result.length - 1) {
      return result.map(comment => comment.replace(/^\*/g, '').replace(/^( |　|\^t)*/g, ''))
    }

    return result
  }

  private extractBlock(content: string) {
    let extracted = this.extractHashCommentBlock(content)
    if (extracted.length > 0) {
      return extracted
    }

    extracted = this.extractSlashCommentBlock(content)
    if (extracted.length > 0) {
      return extracted
    }

    return this.extractMultilineCommentBlock(content)
  }


  private extractComment(content: string) {
    const headingComments = this.extractBlock(content)
    const raw = headingComments.join('\n')

    const titleIndex = headingComments.findIndex(line => line !== '')
    const title = headingComments[titleIndex] || ''
    const commentsAfterTitle = headingComments.slice(titleIndex + 1)
    const beginningCommentIndex = commentsAfterTitle.findIndex(line => line !== '')
    const comment = beginningCommentIndex >= 0 ? commentsAfterTitle.slice(beginningCommentIndex).join('\n') || '' : ''

    if (!title) {
      return {raw}
    }

    return {
      raw,
      title,
      comment
    }
  }
}
