# @piyoppi/cron2json-comment-extractor-php

Extract comments from PHP files and convert to documentation.

## Example

```ts
const extractor = new PhpCommentExtractor(['.php'])

const content = `
<?php

#
# Title
#
# Comment
#
# End Comment

echo 'batch';
`

// Result:
//
// {
//   raw: 'Title\n\nComment\n\nEnd Comment'
//   title: 'Title',
//   comment: 'Comment\n\nEnd Comment'
// }
extractor.extractDocComment(content)

const content2 = `
<?php

/**
 * Title
 *
 * Comment
 * 
 * End Comment
 */

echo 'batch';
`

// Result:
//
// {
//   raw: 'Title\n\nComment\n\nEnd Comment'
//   title: 'Title',
//   comment: 'Comment\n\nEnd Comment'
// }
extractor.extractDocComment(content2)
```

