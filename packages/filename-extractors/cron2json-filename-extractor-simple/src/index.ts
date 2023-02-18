import { Cron2JsonFilenameExtractor } from '@piyoppi/cron2json-filename-extractor'
import { join as pathJoin } from 'path'

export type OverridePath = {
  from: string,
  to: string
}

type Options = {
  baseDir?: string | null,
  overridePathes?: OverridePath[]
}

export class Cron2JsonSimpleFilenameExtractor implements Cron2JsonSimpleFilenameExtractor {
  constructor(
    private _whitelist: string[],
    private _options: Options = {}
  ) {

    // validate pathes

    this._whitelist.forEach(item => {
      if (item[0] !== '/') throw new Error('The filename whitelist must not contain relative paths')
    })

    if (this._options.baseDir && this._options.baseDir[0] !== '/') throw new Error('The baseDir must not contain relative paths')

    this._options.overridePathes?.forEach(path => {
      if (path.from[0] !== '/') throw new Error('The overridePathes(from) must not contain relative paths')
      if (path.to[0] !== '/') throw new Error('The overridePathes(to) must not contain relative paths')
    })

    // normalize trailing slash

    if (this._options.baseDir && this._options.baseDir.slice(-1) !== '/') {
      this._options.baseDir += '/'
    }

    this._options.overridePathes = this._options.overridePathes?.map(val => ({
      from: val.from.slice(-1) !== '/' ? val.from + '/' : val.from,
      to: val.to.slice(-1) !== '/' ? val.to + '/' : val.to
    }))
  }

  private extractAbsolutePath(command: string) {
    return this._whitelist
      .reduce<string | null>((acc, val) => {
        if (acc) return acc

        const overridePath = this._options.overridePathes?.find(path => val.indexOf(path.to) === 0)
        const whitelistPath = overridePath ? val.replace(overridePath.to, overridePath.from) : val
        const matchPosition = command.indexOf(whitelistPath)
        const extractedFilename = matchPosition >= 0 ? whitelistPath : null

        if (!extractedFilename) return null

        if (overridePath) {
          return extractedFilename.replace(overridePath.from, overridePath.to)
        }

        return extractedFilename
      }, null)
  }

  private extractRelativePath(command: string) {
    if (!this._options.baseDir) return null

    return this._whitelist
      .reduce<string | null>((acc, val) => {
        if (!this._options.baseDir) return null
        if (acc) return acc

        const whitelistPath = val.replace(this._options.baseDir, '')
        const matchPosition = command.indexOf(whitelistPath)
        const extractedFilename = matchPosition >= 0 ? whitelistPath : null

        if (!extractedFilename) return null

        const isRelativePath = extractedFilename[0] !== '/'

        if (!isRelativePath) return null

        return (matchPosition === 0 || command[matchPosition - 1].match(/["' ]/g)) ? pathJoin(this._options.baseDir, extractedFilename) : null
      }, null)
  }

  extract(command: string) {
    return this.extractAbsolutePath(command) || this.extractRelativePath(command)
  }
}
