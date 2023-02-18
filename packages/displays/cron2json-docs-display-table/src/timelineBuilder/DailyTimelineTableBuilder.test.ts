import { test, expect } from 'vitest'
import { DailyTimelineTableBuilder } from './DailyTimelineTableBuilder'

const docs = [
  {
    schedule: {
      command: 'hogefuga.sh',
      filename: 'hogefuga.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [0, 12] as const,
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
      command: 'foo.sh',
      filename: 'foo.sh',
      fields: {
        second: [0] as const,
        minute: [0] as const,
        hour: [6, 18] as const,
        dayOfMonth: [1] as const,
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
  }
]

const dictionary = {
  column: {
    time: 'Time',
    command: 'Command',
    title: 'Title' 
  }
}

test('Should return markdown table', () => {
  const timelineBuilder = new DailyTimelineTableBuilder(dictionary)
  expect(timelineBuilder.build(docs)).toEqual(`| Time | Command | Title |
| --- | --- | --- |
| 00:00:00 | hogefuga.sh | comment |
| 06:00:00 | piyo.sh | comment |
| 12:00:00 | hogefuga.sh | comment |
| 18:00:00 | piyo.sh | comment |`)
})
