import { CronTabDocument } from '@piyoppi/cron2json-docs-generator'

export type JobListTableDictionary = {
  field: {
    month: string,
    day: string,
    time: string,
    command: string
  }
}

export class JobListTableBuilder {
  constructor(
    private _textDictionary: JobListTableDictionary
  ) {
  }

  public build(doc: CronTabDocument) {
    const times = doc.schedule.fields.hour.map(hour =>
      doc.schedule.fields.minute.map(minute =>
        doc.schedule.fields.second.map(second => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`)
      )
    ).flat().join(',')

    return `| ${this._textDictionary.field.command} | ${doc.schedule.command} |\n` +
      `| --- | --- |\n` +
      `| ${this._textDictionary.field.month} | ${doc.schedule.fields.month.join(',')} |\n` +
      `| ${this._textDictionary.field.day} | ${doc.schedule.fields.dayOfMonth.join(',')} |\n` +
      `| ${this._textDictionary.field.time} | ${times} |`
  }
}
