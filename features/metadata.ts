import { IMetaData } from "@/interfaces";
import { Metadata } from "next";

export const generateMeta = (meta: IMetaData, slug: string): Metadata => {
  return {
    title: meta.title,
    authors: {
      name: "Wiktor Kujawa",
      url: process.env.APP_URL,
    },
    alternates: {
      canonical: `${process.env.APP_URL}/${slug}`,
    },
    description: meta.description,
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: `${process.env.APP_URL}/${slug}`,
      creators: "@just-dev-it",
      siteName: process.env.APP_URL,
      images: [{ url: meta?.image?.url, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@just-dev-it',
      title: meta?.title,
      creator: "@just-dev-it",
      description: meta?.description,
      images: [{ url: meta?.image?.url, width: 1200, height: 630 }],
    },
  };
};

