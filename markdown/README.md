# js-markdown

Convert markdown to HTML library for me.

## How to use

```javascript
const { convert } = require('@mryhryki/markdown')

const markdown = `
# TITLE
description
`.trim()

const { title, html } = convert(markdown)
console.log(title) // => TITLE
console.log(html)  // => <h1>TITLE</h1>\n<p>description</p>
```
