import { test, expect } from 'vitest'
import { NoneCommentExtractor } from '.'

test('Should return extracted comment', () => {
  const extractor = new NoneCommentExtractor([], 'abc123')

  expect(extractor.extractDocComment('')).toEqual({raw: 'abc123'})
})
