import { TimelineTableDocBuilder } from './TimelineTableDocBuilder'
import { doc2timeline, CronTabDocument } from '@piyoppi/cron2json-docs-generator'
import { buildRow } from './TableBuilder'

export type DailyTimelineTableBuilderDictionary = {
  column: {
    time: string,
    command: string,
    title: string
  }
}

export class DailyTimelineTableBuilder implements TimelineTableDocBuilder {
  constructor(
    private _textDictionary: DailyTimelineTableBuilderDictionary,
  ) {
  }

  build(docs: CronTabDocument[]) {
    // Create a timeline based on January 1 since it is to be executed daily.
    const timeline = doc2timeline(docs.filter(doc => doc.schedule.cyclic.everyDay && doc.schedule.cyclic.everyMonth), [1], [1])

    return this._buildHeader() + timeline.reduce((acc, item) => acc + '\n' + buildRow(item, ''), '')
    
  }

  private _buildHeader() {
    return `| ${this._textDictionary.column.time} | ${this._textDictionary.column.command} | ${this._textDictionary.column.title} |
| --- | --- | --- |`
  }
}
