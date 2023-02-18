import { test, expect } from 'vitest'
import { MonthlyTimelineTableBuilder } from './MonthlyTimelineTableBuilder'

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
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
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
    id: 0
  },
  {
    schedule: {
      command: 'daily.sh',
      filename: 'daily.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [6] as const,
        dayOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] as const,
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const,
      },
      cyclic: {
        everySecond: false,
        everyMinute: false,
        everyHour: false,
        everyDay: true,
        everyWeek: true,
        everyMonth: true
      }
    },
    comment: {raw: 'comment'},
    id: 1
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
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
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
  },
  {
    schedule: {
      command: 'foo.sh',
      filename: 'foo.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [6, 18] as const,
        dayOfMonth: [1] as const,
        month: [1] as const,
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
    id: 3
  }
]

const dictionary = {
  column: {
    day: 'Day',
    time: 'Time',
    command: 'Command',
    title: 'Title' 
  }
}

test('Should return markdown table', () => {
  const timelineBuilder = new MonthlyTimelineTableBuilder(dictionary)
  expect(timelineBuilder.build(docs)).toEqual(`| Day | Time | Command | Title |
| --- | --- | --- | --- |
| 5 | 06:00:00 | piyo.sh | comment |
| 5 | 18:00:00 | piyo.sh | comment |
| 10 | 00:00:00 | hogefuga.sh | comment |
| 10 | 06:00:00 | piyo.sh | comment |
| 10 | 12:00:00 | hogefuga.sh | comment |
| 10 | 18:00:00 | piyo.sh | comment |
| 30 | 00:00:00 | hogefuga.sh | comment |
| 30 | 12:00:00 | hogefuga.sh | comment |`)
})
