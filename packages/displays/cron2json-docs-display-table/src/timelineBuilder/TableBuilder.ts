import { TimelineItem } from "@piyoppi/cron2json-docs-generator"

export const buildRow = (item: TimelineItem, prefixColumn: string) => {
  const time = `${item.hour.toString().padStart(2, '0')}:${item.minute.toString().padStart(2, '0')}:${item.second.toString().padStart(2, '0')}`
  const title = item.doc.comment.title || item.doc.comment.raw.replace(' ', '').substring(0, 50)
  const prefixStart= prefixColumn ? '| ' : ''
  const prefixEnd = prefixColumn ? ' ' : ''

  return `${prefixStart}${prefixColumn}${prefixEnd}| ${time} | ${item.doc.schedule.command} | ${title} |`
}
