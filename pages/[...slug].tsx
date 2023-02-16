import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalFile, DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { NodePortfolio } from "components/node--portfolio"
import { NodePage } from "components/node--page"
import { Layout } from "components/layout"
import { NodeBlog } from "../components/node--blog"

const RESOURCE_TYPES = ["node--page", "node--portfolio_item", "node--blog_item"]

interface NodeTeaserProps {
  resource: DrupalNode
}

export default function NodeTeaser({ resource }: NodeTeaserProps) {
  if (!resource) return null

  return (
    <Layout>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {resource.type === "node--page" && <NodePage node={resource} />}
      {resource.type === "node--portfolio_item" && (
        <NodePortfolio node={resource} />
      )}
      {resource.type === "node--blog_item" && <NodeBlog node={resource} />}
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodeTeaserProps>> {
  const path = await drupal.translatePathFromContext(context)
  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName
  let params = {}
  if (type === "node--portfolio_item") {
    params = {
      include:
        "field_full_image,uid,field_paragrafen, field_paragrafen.field_image_para", //note the chaining for fetching related images
    }
  }

  if (type === "node--blog_item") {
    params = {
      include: "uid,field_code, field_code.field_image_para",
    }
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      resource,
    },
  }
}
