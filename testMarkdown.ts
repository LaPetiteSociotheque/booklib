// testMarkdown.ts

import { remark } from "remark"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

const markdown = `
# Titre principal

## Titre de niveau 2

### Titre de niveau 3

Un paragraphe avec un **mot en gras** et un [lien](https://example.com).
`

async function run() {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown)

  console.log(result.toString())
}

run()
