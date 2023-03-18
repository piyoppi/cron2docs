import { test, expect } from 'vitest'
import { cron2doc } from './cron2doc'
import { CommentGenerator } from '@piyoppi/cron2json-comment-generator'

const dummyCommentGenerator: CommentGenerator = {
  generate: (command: string) => command === 'hogefuga.sh' ? null : {raw: 'comment'}
}

const dummyCommentGenerator2: CommentGenerator = {
  generate: (_: string) => ({raw: 'comment2'})
}

const crontabCommand = `
  MAILTO="hogefuga@example.com"

  0 * * * * hogefuga.sh
  0 * * * * piyo.bash
  0 3/3 * * * foo.sh -a -b -c
  0 0 1 * * /hogefuga.sh -a -b -c
`

test('Should return document', () => {
  expect(cron2doc(crontabCommand, [dummyCommentGenerator, dummyCommentGenerator2])).toEqual([
    {
      schedule: {
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
      id: 0,
      comment: {raw: 'comment2'}
    },
    {
      schedule: {
        command: 'piyo.bash',
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
      id: 1,
      comment: {raw: 'comment'}
    },
    {
      schedule: {
        command: 'foo.sh -a -b -c',
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
      },
      id: 2,
      comment: {raw: 'comment'}
    },
    {
      schedule: {
        command: '/hogefuga.sh -a -b -c',
        fields: {
          second: [0],
          minute: [0],
          hour: [0],
          dayOfMonth: [1],
          month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
      id: 3,
      comment: {raw: 'comment'}
    }
  ])
})
