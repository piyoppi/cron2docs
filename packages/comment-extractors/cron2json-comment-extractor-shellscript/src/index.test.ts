import { test, expect } from 'vitest'
import { ShellScriptCommentExtractor } from '.'

test('Should return extracted comment', () => {
  const content = `#!/bin/sh
#
#     Title
#
#   Comment
#
# End Comment

echo 'Test Batch'
    `

  const extractor = new ShellScriptCommentExtractor([])

  expect(extractor.extractDocComment(content)).toEqual({
    raw: `
Title

Comment

End Comment`,
    title: 'Title',
    comment: `Comment

End Comment`
  })
})

test('Should return extracted comment', () => {
  const contentWithoutComment = `
    # Title
    #  
    #   
    `

  const extractor = new ShellScriptCommentExtractor([])

  expect(extractor.extractDocComment(contentWithoutComment)).toEqual({
    raw: `Title

`,
    title: 'Title',
    comment: ''
  })
})

test('Should return extracted comment', () => {
  const contentWithoutComment = `
    echo 'Test'

    # Title
    #  
    #   
    `

  const extractor = new ShellScriptCommentExtractor([])

  expect(extractor.extractDocComment(contentWithoutComment)).toEqual({
    raw: ''
  })
})
