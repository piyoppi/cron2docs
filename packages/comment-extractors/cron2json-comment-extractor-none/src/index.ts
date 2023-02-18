import { CommentExtractor } from '@piyoppi/cron2json-comment-extractor'

export class NoneCommentExtractor implements CommentExtractor {
  constructor(
    private _extensions: string[],
    private _content: string
  ) {
  }

  get extensions() {
    return this._extensions
  }

  extractDocComment(_: string) {
    return {
      raw: this._content
    }
  }
}
