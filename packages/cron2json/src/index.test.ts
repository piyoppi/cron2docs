import { test, expect } from 'vitest'
import { cron2json, cron2jsonMultiRow } from './index'

const expectedCronPattern = {
  '0 * * * * hogefuga.sh': {
    command: 'hogefuga.sh',
    fields: {
      second: [0],
      minute: [0],
      hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      dayOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    cyclic: {
      everySecond: false,
      everyMinute: false,
      everyHour: true,
      everyDay: true ,
      everyWeek:  true,
      everyMonth:  true
    }
  },
  '0 3/3 * * * hogefuga.sh -a -b -c': {
    command: 'hogefuga.sh -a -b -c',
    fields: {
      second: [0],
      minute: [0],
      hour: [3, 6, 9, 12, 15, 18, 21],
      dayOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    cyclic: {
      everySecond: false,
      everyMinute: false,
      everyHour: false,
      everyDay: true ,
      everyWeek:  true,
      everyMonth:  true
    }
  }
}

test('Should return parsed object', () => {
  expect(cron2json('0 * * * * hogefuga.sh')).toEqual(expectedCronPattern['0 * * * * hogefuga.sh'])
  expect(cron2json('0 3/3 * * * hogefuga.sh -a -b -c')).toEqual(expectedCronPattern['0 3/3 * * * hogefuga.sh -a -b -c'])

  expect(() => {cron2json('* hogefuga.sh -a -b -c')}).toThrow('Invalid crontab string was given.')
}) 

test('Should return filtered object', () => {
  const text = `
    MAILTO="hogefuga@example.com"

    0 * * * * hogefuga.sh
    0 3/3 * * * hogefuga.sh -a -b -c
  `
  expect(cron2jsonMultiRow(text)).toEqual([
    expectedCronPattern['0 * * * * hogefuga.sh'],
    expectedCronPattern['0 3/3 * * * hogefuga.sh -a -b -c']
  ])
})
