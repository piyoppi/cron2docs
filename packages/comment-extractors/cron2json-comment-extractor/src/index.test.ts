import { extractCommentBlock } from './index'
import { test, expect } from 'vitest'

test('Should return extracted comments', () => {
  const content = `#
    # hoge
    #
    # fuga
  `
  expect(extractCommentBlock(content, '#')).toEqual(['', 'hoge', '', 'fuga'])
})

test('Should return extracted comments', () => {
  const content = `
    hoge
    #
    # hoge
    #
    # fuga
  `
  expect(extractCommentBlock(content, '#')).toEqual([])
})
