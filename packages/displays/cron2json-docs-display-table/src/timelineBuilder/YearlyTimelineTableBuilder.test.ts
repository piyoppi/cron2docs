import { test, expect } from 'vitest'
import { YearlyTimelineTableBuilder } from './YearlyTimelineTableBuilder'

const docs = [
  {
    schedule: {
      command: 'hogefuga.sh',
      filename: 'hogefuga.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
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
  },
  {
    schedule: {
      command: 'piyo.sh',
      filename: 'piyo.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [6, 18] as const,
        dayOfMonth: [5, 10] as const,
        month: [5, 10] as const,
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
    id: 1
  },
  {
    schedule: {
      command: 'monthly.sh',
      filename: 'monthly.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [6, 18] as const,
        dayOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
        month: [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10, 11, 12] as const,
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const,
      },
      cyclic: {
        everySecond: false,
        everyMinute: false,
        everyHour: false,
        everyDay: false,
        everyWeek: true,
        everyMonth: true
      }
    },
    comment: {raw: 'comment'},
    id: 2
  }
]

const dictionary = {
  column: {
    month: 'Month',
    day: 'Day',
    time: 'Time',
    command: 'Command',
    title: 'Title' 
  }
}

test('Should return markdown table', () => {
  const timelineBuilder = new YearlyTimelineTableBuilder(dictionary)
  expect(timelineBuilder.build(docs)).toEqual(`| Month | Day | Time | Command | Title |
| --- | --- | --- | --- | --- |
| 3 | 10 | 00:00:00 | hogefuga.sh | comment |
| 3 | 10 | 12:00:00 | hogefuga.sh | comment |
| 3 | 30 | 00:00:00 | hogefuga.sh | comment |
| 3 | 30 | 12:00:00 | hogefuga.sh | comment |
| 5 | 5 | 06:00:00 | piyo.sh | comment |
| 5 | 5 | 18:00:00 | piyo.sh | comment |
| 5 | 10 | 06:00:00 | piyo.sh | comment |
| 5 | 10 | 18:00:00 | piyo.sh | comment |
| 10 | 5 | 06:00:00 | piyo.sh | comment |
| 10 | 5 | 18:00:00 | piyo.sh | comment |
| 10 | 10 | 00:00:00 | hogefuga.sh | comment |
| 10 | 10 | 06:00:00 | piyo.sh | comment |
| 10 | 10 | 12:00:00 | hogefuga.sh | comment |
| 10 | 10 | 18:00:00 | piyo.sh | comment |
| 10 | 30 | 00:00:00 | hogefuga.sh | comment |
| 10 | 30 | 12:00:00 | hogefuga.sh | comment |`)
})
