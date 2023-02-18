import { Cron2JsonFilenameExtractor } from '@piyoppi/cron2json-filename-extractor'
import { CommentExtractor } from '@piyoppi/cron2json-comment-extractor'
import { CommentGenerator } from '@piyoppi/cron2json-comment-generator'
import { readFileSync, existsSync } from 'fs'
import { extname } from 'path'

export class FileCommentGenerator implements CommentGenerator {
  constructor(
    private _filenameExtractors: Cron2JsonFilenameExtractor[],
    private _commentExtractors: CommentExtractor[],
  ) {

  }

  generate(command: string) {
    const filename = this.getFilename(command)
    if (!filename) return null

    if (!existsSync(filename)) {
      return null
    }

    let content = null
    try {
      content = readFileSync(filename).toString()
    } catch(e) {
      return null
    }

    const extractor = this._commentExtractors.find(extractor => extractor.extensions.find(extension => extension === extname(filename))) 
    if (!extractor) return null

    const comment = extractor.extractDocComment(content)

    return comment
  }

  private getFilename(command: string) {
    const extractedFilename = this._filenameExtractors.reduce<string | null>((acc, extractor) => acc || extractor.extract(command), null)
    if (!extractedFilename) return null

    return extractedFilename
  }
}
