import { CronTabDocument } from '@piyoppi/cron2json-docs-generator'

export interface TimelineTableDocBuilder {
  build: (docs: CronTabDocument[]) => string
}
