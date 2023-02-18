export interface Cron2JsonFilenameExtractor {
  extract: (command: string) => string | null
}
