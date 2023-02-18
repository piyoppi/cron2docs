import { test, expect } from 'vitest'
import { doc2timeline } from './index'

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
    id: 1
  }
]

test('Should return timeline', () => {
  expect(doc2timeline(docs, [1])).toEqual([
    {month: 1, dayOfMonth:  5, hour:  6, minute: 0, second: 0, sortKey: 105060000, doc: docs[1]},
    {month: 1, dayOfMonth:  5, hour: 18, minute: 0, second: 0, sortKey: 105180000, doc: docs[1]},
    {month: 1, dayOfMonth: 10, hour:  0, minute: 0, second: 0, sortKey: 110000000, doc: docs[0]},
    {month: 1, dayOfMonth: 10, hour:  6, minute: 0, second: 0, sortKey: 110060000, doc: docs[1]},
    {month: 1, dayOfMonth: 10, hour: 12, minute: 0, second: 0, sortKey: 110120000, doc: docs[0]},
    {month: 1, dayOfMonth: 10, hour: 18, minute: 0, second: 0, sortKey: 110180000, doc: docs[1]},
    {month: 1, dayOfMonth: 30, hour:  0, minute: 0, second: 0, sortKey: 130000000, doc: docs[0]},
    {month: 1, dayOfMonth: 30, hour: 12, minute: 0, second: 0, sortKey: 130120000, doc: docs[0]},
  ])
})
