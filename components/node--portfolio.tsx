import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"
import { Paragraph } from "components/paragraph"

interface NodePortfolioProps {
  node: DrupalNode
}
let id
export function NodePortfolio({ node, ...props }: NodePortfolioProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Full node by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_full_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_full_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_full_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_full_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_full_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}

      {node.field_intro && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_intro?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}

      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}

      {node.field_paragrafen.map((paragraph) => {
        return <Paragraph key={paragraph.id} paragraph={paragraph} />
      })}
    </article>
  )
}
