# @piyoppi/cron2json-comment-generator-yaml

Generate documents from a yaml file.

```yaml
commands:
  - pattern: 'Regular Expression Patterns'
    comment:
      title: 'Title'
      summary: 'Summary'
```

## Example

```javascript
import { YamlCommentGenerator } from '@piyoppi/cron2json-comment-generator-yaml'

const document = `
commands:
  - pattern: "\/path\/to\/daily-sales-script.sh"
    comment:
      title: "Daily Sales Script"
      summary: "Tally yesterday's sales."
`

// Result:
// 
// {
//   title: 'Daily Sales Script',
//   summary: 'Tally yesterday's sales',
//   raw: ''
// }
//
// The results will depend on the CommentExtractor implementation.
generator.generator('/bin/bash -c /path/to/daily-sales-script.sh -a 1 -b 2')
```


