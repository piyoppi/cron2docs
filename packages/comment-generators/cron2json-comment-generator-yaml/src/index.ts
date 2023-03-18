import { parse } from 'yaml'
import { CommentGenerator } from '@piyoppi/cron2json-comment-generator'

type Parsed = {
  commands: {
    pattern: string,
    comment: {
      title: string,
      summary: string
    }
  }[]
}

export class YamlCommentGenerator implements CommentGenerator {
  private _parsed: Parsed

  constructor(
    private _content: string
  ) {
    this._parsed = parse(this._content) as Parsed
  }

  generate(command: string) {
    const matched = this._parsed.commands.find(item => command.match(new RegExp(item.pattern)))

    if (!matched) return null
    
    return {
      title: matched.comment.title,
      summary: matched.comment.summary,
      raw: `${matched.comment.title}\n${matched.comment.summary}`
    }
  }
}
