import { drupal } from "lib/drupal"
import Image from "next/image"
import { absoluteUrl } from "../lib/utils"

export function ParagraphImage({ paragraph: { field_image_para }, ...props }) {
  return (
    <>
      {
        <Image
          src={absoluteUrl(field_image_para.uri.url)}
          width={768}
          height={400}
          alt={field_image_para.resourceIdObjMeta.alt}
          priority
        />
      }
    </>
  )
}
