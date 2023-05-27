import {convertToHtmlString} from "../src";

const sourceMarkdown = `
* **bold**
* list
`

const expectHtml = `
<ul>
<li><strong>bold</strong></li>
<li>list</li>
</ul>
`

it('essential', () => {
  expect(convertToHtmlString(sourceMarkdown)).toEqual(expectHtml)
})
