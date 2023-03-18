import { test, expect } from 'vitest'
import { YamlCommentGenerator } from './index'

test('Should return matched comment', () => {
  const config = `
commands:
  - pattern: hoge/fuga.sh
    comment: 
      title: HogeFuga Script
      summary: |
        HogeFuga Summary
        foo
        bar
  - pattern: foo/.*.sh
    comment: 
      title: Foo Script
      summary: |
        Foo Summary
        hoge
        fuga
`

  const generator = new YamlCommentGenerator(config)
  expect(generator.generate('/bin/bash -c "hoge/fuga.sh"')).toEqual({
    title: 'HogeFuga Script',
    summary: `HogeFuga Summary
foo
bar
`,
    raw: `HogeFuga Script
HogeFuga Summary
foo
bar
`,
  })

  expect(generator.generate('/bin/bash -c "foo/bar.sh"')).toEqual({
    title: 'Foo Script',
    summary: `Foo Summary
hoge
fuga
`,
    raw: `Foo Script
Foo Summary
hoge
fuga
`,
  })

  expect(generator.generate('/bin/bash -c "/none.sh"')).toEqual(null)
})
