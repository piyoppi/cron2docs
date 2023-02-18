import { cron2jsonMultiRow, ParsedCronJson } from '@piyoppi/cron2json'
import { CommentGenerator, ExtractedComment } from '@piyoppi/cron2json-comment-generator'

export interface CronTabDocument {
  id: number,
  schedule: ParsedCronJson,
  comment: ExtractedComment
}

export const cron2doc = (cronText: string, generators: CommentGenerator[]): CronTabDocument[] => {
  const parsedItems = cron2jsonMultiRow(cronText)

  return parsedItems
    .map((schedule, index) => {
      const buildResult = (comment = {raw: ''}) => ({schedule: schedule, id: index, comment})
      const comment = generators.reduce<ExtractedComment | null>((acc, generator) => acc || generator.generate(schedule.command), null)

      return buildResult(comment || {raw: ''})
    })
}
