# js-markdown

[![npm version](https://badge.fury.io/js/@mryhryki%2Fmarkdown.svg)](https://badge.fury.io/js/@mryhryki%2Fmarkdown)

Convert markdown to HTML library for personal use.

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
