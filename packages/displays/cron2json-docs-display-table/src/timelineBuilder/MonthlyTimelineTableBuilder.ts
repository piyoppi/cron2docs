import { TimelineTableDocBuilder } from './TimelineTableDocBuilder'
import { doc2timeline, CronTabDocument } from '@piyoppi/cron2json-docs-generator'
import { buildRow } from './TableBuilder'

export type MonthlyTimelineTableBuilderDictionary = {
  column: {
    day: string,
    time: string,
    command: string,
    title: string
  }
}

export class MonthlyTimelineTableBuilder implements TimelineTableDocBuilder {
  constructor(
    private _textDictionary: MonthlyTimelineTableBuilderDictionary,
    private _exceptEveryDay: boolean = true
  ) {
  }

  build(docs: CronTabDocument[]) {
    // Create a timeline based on January since it is to be executed daily.
    const timeline = doc2timeline(docs.filter(doc => (this._exceptEveryDay ? !doc.schedule.cyclic.everyDay : true) && doc.schedule.cyclic.everyMonth), [1])

    return this._buildHeader() +
      timeline.reduce((acc, item) => acc + '\n' + buildRow(item, item.dayOfMonth.toString()), '')
  }

  private _buildHeader() {
    return `| ${this._textDictionary.column.day} | ${this._textDictionary.column.time} | ${this._textDictionary.column.command} | ${this._textDictionary.column.title} |
| --- | --- | --- | --- |`
  }
}
