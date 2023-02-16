import React from "react"
import { DrupalParagraph } from "next-drupal"

import { ParagraphText } from "components/paragraph--text"
import { ParagraphImage } from "components/paragraph--image"
import { ParagraphCode } from "components/paragraph--code"

const paragraphTypes = {
  "paragraph--text": ParagraphText,
  "paragraph--full_image": ParagraphImage,
  "paragraph--code": ParagraphCode,
}

export interface ParagraphProps {
  paragraph: DrupalParagraph
}
export function Paragraph({ paragraph, ...props }: ParagraphProps) {
  if (!paragraph) {
    return null
  }

  const Component = paragraphTypes[paragraph.type]

  if (!Component) {
    return null
  }
  //Todo redundant code
  if (Component === ParagraphImage) {
    return <Component paragraph={paragraph} {...props} />
  }
  return <Component paragraph={paragraph} {...props} />
}
