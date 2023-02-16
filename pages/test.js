import { DrupalClient } from "next-drupal";
import Image from "next/image";
import { absoluteUrl } from "../lib/utils";

const drupal = new DrupalClient("https://backend.guusvandewal.nl", {
  debug: true,
});
export default function Test({ articles, image }) {
  console.log(image);
  return (
    <div>
      {articles?.length
        ? articles.map(
            (node) => (
              console.log(node.field_paragrafen),
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
                  {
                    (node.field_paragrafen.type = "paragraph--full_image" && (
                      <figure>
                        <Image
                          src={absoluteUrl(image?.uri?.url)}
                          width={768}
                          height={400}
                          alt="test"
                          priority
                        />
                      </figure>
                    ))
                  }
                </div>
              )
            )
          )
        : null}
    </div>
  );
}

export async function getStaticProps(context) {
  const articles = await drupal.getResourceCollectionFromContext(
    "node--portfolio_item",
    context
  );
  const images = await drupal.getResourceCollectionFromContext(
    "file--file",
    context
  );

  const image = await drupal.getResource(
    "file--file",
    "0655df6c-1edd-4627-817c-74717abf8ddf"
  );

  return {
    props: {
      articles,
      image,
    },
  };
}
