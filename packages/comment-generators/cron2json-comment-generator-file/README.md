# @piyoppi/cron2json-comment-generator-file

Generate documents from script files.

## Example

```ts
import { Cron2JsonSimpleFilenameExtractor } from '@piyoppi/cron2json-filename-extractor-simple'
import { PhpCommentExtractor } from '@piyoppi/cron2json-comment-extractor-php'

const generator = new FileCommentGenerator(
    [
      new Cron2JsonSimpleFilenameExtractor()
    ],
    [
      new PhpCommentExtractor(['.php'])
    ]
)

// Result:
// 
// {raw: 'hoge'}
//
// The results will depend on the CommentExtractor implementation.
generator.generator('/bin/bash -c /path/to/src/test001.php')

```
