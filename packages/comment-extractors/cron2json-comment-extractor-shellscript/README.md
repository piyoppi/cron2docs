# @piyoppi/cron2json-comment-extractor-shellscript

Extract comments from ShellScript files and convert to documentation.

## Example

```ts
const extractor = new ShellScriptCommentExtractor(['.sh'])

const content = `#!/bin/sh
# Title
#
# Comment
#
# End Comment

echo 'batch'
`

// Result:
//
// {
//   raw: 'Title\n\nComment\n\nEnd Comment'
//   title: 'Title',
//   comment: 'Comment\n\nEnd Comment'
// }
extractor.extractDocComment(content)

const content = `#!/bin/sh

echo 'batch';
#
#     Title
#

echo 'batch'
`

// Result:
//
// {
//   raw: 'Title\n'
//   title: 'Title',
//   comment: ''
// }
extractor.extractDocComment(content2)
```

