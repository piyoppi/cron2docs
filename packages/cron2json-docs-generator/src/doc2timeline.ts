import {
  MonthRange,
  DayOfMonthRange,
  HourRange,
  MinuteRange,
  SecondRange,
} from '@piyoppi/cron2json'
import { CronTabDocument } from './cron2doc'

export type TimelineItem = {
  month: MonthRange,
  dayOfMonth: DayOfMonthRange,
  hour: HourRange,
  minute: MinuteRange,
  second: SecondRange,
  doc: CronTabDocument,
  sortKey: number
}

export const doc2timeline = (
  docs: CronTabDocument[],
  monthFilter: MonthRange[] = [],
  dayOfMonthFilter: DayOfMonthRange[] = []
) => {
 return docs.map(doc => {
    const times: TimelineItem[] = []
    const month = monthFilter.length > 0 ?
      doc.schedule.fields.month.filter(month => monthFilter.includes(month)) :
      Array.from(doc.schedule.fields.month)
    const dayOfMonth = dayOfMonthFilter.length > 0 ?
      doc.schedule.fields.dayOfMonth.filter(dayOfMonth => dayOfMonthFilter.includes(dayOfMonth)) :
      Array.from(doc.schedule.fields.dayOfMonth)
    const hour = Array.from(doc.schedule.fields.hour)
    const minute = Array.from(doc.schedule.fields.minute)
    const second = Array.from(doc.schedule.fields.second)

    month.forEach(month => {
      dayOfMonth.forEach(dayOfMonth => {
        hour.forEach(hour => {
          minute.forEach(minute => {
            second.forEach(second => {
              const sortKey = parseInt(
                month.toString() +
                dayOfMonth.toString().padStart(2, '0') +
                hour.toString().padStart(2, '0') +
                minute.toString().padStart(2, '0') +
                second.toString().padStart(2, '0')
              )

              times.push({month, dayOfMonth, hour, minute, second, sortKey, doc})
            })
          })
        })
      })
    })

    return times
  }).flat().sort((a, b) => a.sortKey - b.sortKey)
}
