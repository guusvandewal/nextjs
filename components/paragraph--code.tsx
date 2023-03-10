import { ParagraphProps } from "components/paragraph"
import React, { useEffect, useState } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-graphql"
import "prismjs/components/prism-typescript"
import 'prismjs/components/prism-markup-templating';
import "prismjs/components/prism-php"
import "prismjs/components/prism-php-extras"
import "prismjs/components/prism-twig"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-tsx"
//import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"

import "prismjs/themes/prism.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
export function ParagraphCode({ paragraph, ...props }: ParagraphProps) {
  const codeType = `language-${paragraph.field_code_type}`
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll() // <--- prepare Prism
    }
    highlight().then(r => console.log("highlighted"))
  }, [paragraph])

  return (
    <section>
      {paragraph.field_code && (
          <pre className="line-numbers"><code className={codeType}>{paragraph.field_code}</code></pre>
      )}
    </section>
  )
}
