import { CommentExtractor, extractCommentBlock } from '@piyoppi/cron2json-comment-extractor'

export class ShellScriptCommentExtractor implements CommentExtractor {
  constructor(
    private _extensions: string[]
  ) {
  }

  get extensions() {
    return this._extensions
  }

  extractDocComment(content: string) {
    return this.extractComment(content)
  }

  private extractBlock(content: string) {
    const comment = extractCommentBlock(content, '#')

    return comment[0]?.at(0) === '!' ? comment.slice(1) : comment
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
