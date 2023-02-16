import { DrupalClient } from "next-drupal"
import Image from "next/image"
import { absoluteUrl } from "../lib/utils"

const drupal = new DrupalClient("https://backend.guusvandewal.nl", {
  debug: true,
})
export default function Test({ articles, image, menu }) {
  return (
    <div>
      {menu?.length
        ? menu.map(
            (node) => (
              (
                <div key={node.id}>
                  <h1>{node.title}</h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: node.field_intro?.processed,
                    }}
                  ></div>
                  <div
                    dangerouslySetInnerHTML={{ __html: node.field_paragrafen }}
                  ></div>

                </div>
              )
            )
          )
        : null}
    </div>
  )
}

export async function getStaticProps(context) {
  const articles = await drupal.getResourceCollectionFromContext(
    "node--portfolio_item",
    context
  )
  const images = await drupal.getResourceCollectionFromContext(
    "file--file",
    context
  )

  const image = await drupal.getResource(
    "file--file",
    "0655df6c-1edd-4627-817c-74717abf8ddf"
  )

  const id = "07464e9f-9221-4a4f-b7f2-01389408e6c8"

  const menu = await drupal.getResourceCollectionFromContext("node--portfolio_item", {
    context,
    withAuth: {
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
    },
  })

  return {
    props: {
      articles,
      image,
      menu,
    },
  }
}
