import { PhpCommentExtractor } from './index'
import { test, expect } from 'vitest'

test('Should return extracted comment', () => {
  const content = `<?php

    #
    #     Title
    #
    #   Comment
    #
    # End Comment

    echo 'Test Batch'
    `

  const extractor = new PhpCommentExtractor([])

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
  const content = `<?php

   // 
   //      Title
   // 
   //    Comment
   // 
   //  End Comment

    echo 'Test Batch'
    `

  const extractor = new PhpCommentExtractor([])

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
  const content = `<?php

   /**
    Title
   
    Comment
      * 1
      * 2
      * 3
     
    End Comment
    */

    echo 'Test Batch'
    `

  const extractor = new PhpCommentExtractor([])

  expect(extractor.extractDocComment(content)).toEqual({
    raw: `Title

Comment
* 1
* 2
* 3

End Comment`,
    title: 'Title',
    comment: `Comment
* 1
* 2
* 3

End Comment`
  })
})

test('Should return extracted comment', () => {
  const content = `<?php

   /**
    * Title
    *
    * Comment
    *  
    * End Comment
    **/

    echo 'Test Batch'
    `

  const extractor = new PhpCommentExtractor([])

  expect(extractor.extractDocComment(content)).toEqual({
    raw: `Title

Comment

End Comment`,
    title: 'Title',
    comment: `Comment

End Comment`
  })
})
