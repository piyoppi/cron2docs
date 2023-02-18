import parser from 'cron-parser'
import "@piyoppi/util-types"

export type CronJsonFields = {
  second: readonly SecondRange[],
  minute: readonly MinuteRange[],
  hour: readonly HourRange[],
  dayOfMonth: readonly DayOfMonthRange[],
  month: readonly MonthRange[],
  dayOfWeek: readonly Week[]
}

export type SecondRange = NumberRange<0, 59>
export type MinuteRange = NumberRange<0, 59>
export type HourRange = NumberRange<0, 23>
export type DayOfMonthRange = NumberRange<1, 31>
export type MonthRange = NumberRange<1, 12>

export type ParsedCronJson = {
  command: string,
  fields: CronJsonFields,
  cyclic: {
    everySecond: boolean,
    everyMinute: boolean,
    everyHour: boolean,
    everyDay: boolean,
    everyWeek: boolean
    everyMonth: boolean,
  }
}

export type Week =
  'Sunday' |
  'Monday' |
  'Tuesday' |
  'Wednesday' |
  'Thursday' |
  'Friday' |
  'Saturday'

export function cron2jsonMultiRow(text: string): ParsedCronJson[] {
  return filterCrontabScheduleText(text).map(cron => cron2json(cron))
}

export function cron2json(cron: string): ParsedCronJson {
  const scheduleParamsString = extractSchedulePattern(cron)

  if (!scheduleParamsString) throw new Error('Invalid crontab string was given.')

  const schedule = parser.parseExpression(scheduleParamsString)
  const dayOfMonth = schedule.fields.dayOfMonth.filter(val => val !== 'L') as NumberRange<1, 31>[]
  const dayOfWeek = new Set<Week>()
  schedule.fields.dayOfWeek.forEach(week => dayOfWeek.add(([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ] as Week[])[week]))
  const command = cron.substring(scheduleParamsString.length)
  const fields = {
    ...schedule.fields,
    dayOfMonth,
    dayOfWeek: Array.from(dayOfWeek)
  }

  return {
    command,
    fields,
    cyclic: {
      everySecond: fields.second.length === 60,
      everyMinute: fields.minute.length === 60,
      everyHour: fields.hour.length === 24,
      everyDay: fields.dayOfMonth.length === 31,
      everyWeek: fields.dayOfWeek.length === 7,
      everyMonth: fields.month.length === 12
    }
  }
}

function filterCrontabScheduleText(text: string): string[] {
  return text.split('\n')
    .map(row => extractSchedulePattern(row) ? row.replace(/^ +/, '') : null) 
    .filter(row => !!row) as string[]
}

function extractSchedulePattern(cron: string): string {
  const matched = cron.match(/^(([*,/-\d]* ){5,6})/g)

  if (!matched || matched.length === 0) return ''

  return matched[0]
}
