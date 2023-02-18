import { test, expect } from 'vitest'
import { CronTabDocument } from '@piyoppi/cron2json-docs-generator'
import { JobListTableBuilder } from './JobListTableBuilder'

const doc: CronTabDocument = {
  schedule: {
    command: 'hogefuga.sh',
    fields: {
      second: [0] as const,
      minute: [0, 30] as const,
      hour: [0, 12] as const,
      dayOfMonth: [10, 30] as const,
      month: [3, 10] as const,
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const,
    },
    cyclic: {
      everySecond: false,
      everyMinute: false,
      everyHour: false,
      everyDay: false,
      everyWeek: true,
      everyMonth: false
    }
  },
  comment: {raw: 'comment'},
  id: 0
}

const dictionary = {
  field: {
    month: 'Month',
    day: 'Day',
    time: 'Time',
    command: 'Command'
  }
}

test('Should return markdown table', () => {
  const tableBuilder = new JobListTableBuilder(dictionary)
  expect(tableBuilder.build(doc)).toEqual(`| Command | hogefuga.sh |
| --- | --- |
| Month | 3,10 |
| Day | 10,30 |
| Time | 00:00:00,00:30:00,12:00:00,12:30:00 |`)
})
