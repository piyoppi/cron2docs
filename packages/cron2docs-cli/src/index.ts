import { Command } from 'commander'
import { build } from '@piyoppi/cron2json-docs-display-markdown'

const program = new Command()

program
  .name('cron2docs-cli')
  .description('Crontab to document builder')
  .version('0.0.1')

program
  .requiredOption('-f, --file <filename>', 'Crontab file')
  .requiredOption('-o, --output <filename>', 'Output file')
  .option('-l, --language <language>', 'language')
  .option('--relative-path-base-dir <dirname>', 'Relative path base directory')
  .option('-t', '--task-dirs <dirname>', 'Script directory (comma separated)')
  .option('-d', '--document-yaml-filename <filename>', 'Document yaml filename')
  .option('--rewrite-whitelist-path-from', 'Set to rewrite the white list basepath')
  .option('--rewrite-whitelist-path-to', 'Set to rewrite the white list basepath')

program.parse(process.argv)

const options = program.opts()

const filename = options.file
const baseDir = options.relativePathBaseDir || null
const taskDirs = options.taskDirs?.split(',') || []
const outputFilename = options.output || null
const documentYamlFilename = options.documentYamlFilename || null
const rewriteWhitelistPathFrom = options.rewriteWhitelistPathFrom || null
const rewriteWhitelistPathTo = options.rewriteWhitelistPathTo || null

const content = {
  type: 'filename' as const,
  content: filename
}

const rewiteWhitelistPathes = rewriteWhitelistPathFrom && rewriteWhitelistPathTo ? [{
  from: rewriteWhitelistPathFrom,
  to: rewriteWhitelistPathTo
}] : []

const dictionary = options.language === 'ja' ? 'ja' : 'en'

build(content, taskDirs, dictionary, outputFilename, baseDir, rewiteWhitelistPathes, documentYamlFilename)
