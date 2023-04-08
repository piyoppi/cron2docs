import * as core from '@actions/core'
import { build } from '@piyoppi/cron2json-docs-display-markdown' 

const filename = core.getInput('cron_file')
const baseDir = core.getInput('relative_path_base_dir') || null
const dictionary = core.getInput('language') === 'ja' ? 'ja' : 'en'
const taskDirs = core.getInput('task_dirs')?.split(',').filter(dir => !!dir) || []
const outputFilename = core.getInput('output_filename') || null
const documentYamlFilename = core.getInput('document_yaml_filename')
const rewriteWhitelistPathFrom = core.getInput('rewrite_whitelist_path_from') || null
const rewriteWhitelistPathTo = core.getInput('rewrite_whitelist_path_to') || null

const content = {
  type: 'filename' as const,
  content: filename
}

const rewiteWhitelistPathes = rewriteWhitelistPathFrom && rewriteWhitelistPathTo ? [{
  from: rewriteWhitelistPathFrom,
  to: rewriteWhitelistPathTo
}] : []

build(content, taskDirs, dictionary, outputFilename, baseDir, rewiteWhitelistPathes, documentYamlFilename)
