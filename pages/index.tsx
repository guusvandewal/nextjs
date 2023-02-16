import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "lib/drupal";
import { Layout } from "components/layout";
import { NodePortfolioTeaser } from "../components/node--portfolio--teaser";
import { NodePageTeaser } from "../components/node--page--teaser";

interface IndexPageProps {
    portfolioNodes: DrupalNode[];
    pageNodes: DrupalNode[];
}

export default function IndexPage({
  portfolioNodes,
  pageNodes,
}: IndexPageProps) {
  return (
    <Layout>
      <Head>
        <title>Guus.js for Drupal</title>
        <meta
          name="description"
          content="A Guus.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {portfolioNodes?.length ? (
          portfolioNodes.map((node) => (
            <div key={node.id}>
              <NodePortfolioTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
      <div>
        <h2 className="mb-10 text-6xl font-black">Latest Pages.</h2>
        {pageNodes?.length ? (
          pageNodes.map((node) => (
            <div key={node.id}>
              <NodePageTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const portfolioNodes = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--portfolio_item", context, {
    params: {
      "filter[status]": 1,
      "fields[node--portfolio_item]":
        "title,path,field_full_image,uid,created,field_intro",
      include: "field_full_image,uid,field_paragrafen",
      sort: "-created",
    },
  });

  const pageNodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--page",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--page]":
          "title,path,field_full_image,uid,created,field_intro",
        include: "field_full_image,uid,field_para",
        sort: "-created",
      },
    }
  );

  return {
    props: {
      portfolioNodes,
      pageNodes,
    },
  };
}
