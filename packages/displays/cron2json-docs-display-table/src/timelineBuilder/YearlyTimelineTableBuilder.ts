import { TimelineTableDocBuilder } from './TimelineTableDocBuilder'
import { doc2timeline, CronTabDocument } from '@piyoppi/cron2json-docs-generator'
import { buildRow } from './TableBuilder'

export type YearlyTimelineTableBuilderDictionary = {
  column: {
    month: string,
    day: string,
    time: string,
    command: string,
    title: string
  }
}

export class YearlyTimelineTableBuilder implements TimelineTableDocBuilder {
  constructor(
    private _textDictionary: YearlyTimelineTableBuilderDictionary,
    private _exceptEveryMonth: boolean = true,
    private _exceptEveryDay: boolean = true
  ) {
  }

  build(docs: CronTabDocument[]) {
    const timeline = doc2timeline(
      docs.filter(doc =>
        (this._exceptEveryDay ? !doc.schedule.cyclic.everyDay : true) &&
        (this._exceptEveryMonth? !doc.schedule.cyclic.everyMonth : true)
      )
    )

    return this._buildHeader() +
      timeline.reduce((acc, item) => acc + '\n' + buildRow(item, `${item.month} | ${item.dayOfMonth}`), '')
  }

  private _buildHeader() {
    return `| ${this._textDictionary.column.month} | ${this._textDictionary.column.day} | ${this._textDictionary.column.time} | ${this._textDictionary.column.command} | ${this._textDictionary.column.title} |
| --- | --- | --- | --- | --- |`
  }
}
