import { ParagraphProps } from "components/paragraph"
import React, { useEffect } from "react"
import Prism from "prismjs"
export function ParagraphCode({ paragraph, ...props }: ParagraphProps) {
  console.log("paragraph", paragraph)
  const codeType = `language-${paragraph.field_code_type}`
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 50)
  }, [])
  return (
    <section>
      {paragraph.field_code && (
        <pre className="line-numbers">
          <code
            className={codeType}
            dangerouslySetInnerHTML={{ __html: paragraph.field_code }}
          />
        </pre>
      )}
    </section>
  )
}
