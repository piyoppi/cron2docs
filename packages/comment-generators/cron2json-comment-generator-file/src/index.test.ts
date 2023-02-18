import { test, expect } from 'vitest'
import { FileCommentGenerator } from '.'
import { CommentExtractor } from '@piyoppi/cron2json-comment-extractor'
import { Cron2JsonFilenameExtractor } from '@piyoppi/cron2json-filename-extractor'

class DummyFilenameExtractor implements Cron2JsonFilenameExtractor {
  constructor(private _filename: string) {
  }

  extract(command: string) {
    if (command.includes(this._filename)) return this._filename

    return null
  }
}

class DummyCommentExtractor implements CommentExtractor {
  constructor(private _extensions: string[]) {}

  get extensions() {
    return this._extensions
  }

  extractDocComment(text: string) {
    const textLines = text.split('\n')
    return {raw: textLines[1]}
  }
}

test('Should return extracted comment', () => {
  const commandGenerator = new FileCommentGenerator(
    [
      new DummyFilenameExtractor(process.cwd() + '/src/misc/tests/test001.sh'),    // File exists
      new DummyFilenameExtractor(process.cwd() + '/src/misc/tests/test002.php'),   // File exists
      new DummyFilenameExtractor(process.cwd() + '/src/misc/tests/test003.sh')     // File not found
    ],
    [
      new DummyCommentExtractor(['.sh']),
      new DummyCommentExtractor(['.php'])
    ]
  )

  expect(commandGenerator.generate(`/bin/bash -c "${process.cwd()}/src/misc/tests/test001.sh"`)).toEqual({raw: '# hoge'})
  expect(commandGenerator.generate(`/bin/bash -c "${process.cwd()}/src/misc/tests/test002.php"`)).toEqual({raw: '// hoge'})
  expect(commandGenerator.generate(`/bin/bash -c "${process.cwd()}/src/misc/tests/test003.sh"`)).toEqual(null)
})
