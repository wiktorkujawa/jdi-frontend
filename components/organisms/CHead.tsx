import { MetaData } from "@/interfaces";
import Head from "next/head";
import React from "react";

type Props = {
  meta: MetaData;
  slug: string;
};

const CHead = ({ meta: { title, description, image }, slug }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Wiktor Kujawa"/>
      <meta name="description" content={description} />
      <meta
        name="og:url"
        property="og:url"
        content={`https://just-dev-it.com/${slug}`}
      />
      <link rel="canonical" href={`https://just-dev-it.com/${slug}`}/>
      <meta name="og:type" property="og:type" content="article" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="og:image" property="og:image" content={image?.url} />
      <meta name="og:site_name" property="og:site_name" content="Just-Dev-It" />
      <meta name="description" property="description" content={description} />
      <meta
        name="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:site"
        property="twitter:site"
        content="@just-dev-it"
      />
      <meta
        name="twitter:creator"
        property="twitter:creator"
        content="@just-dev-it"
      />
      <meta name="twitter:title" property="twitter:title" content={title} />
      <meta
        name="twitter:description"
        property="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        property="twitter:image"
        content={image?.url}
      />
    </Head>
  );
};

export default CHead;
