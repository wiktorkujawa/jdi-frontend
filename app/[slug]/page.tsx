import LCustomComponents from "@/components/templates/LCustomComponents";
import { Page, PageContent } from "@/interfaces";
import React, { FC } from "react";
import { Metadata } from "next";

const mainPages = ["/", "experience", "wasm", ""];

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}pages`);
  const { docs } = await res.json();

  const result: PageContent[] = docs.filter((item: any) => !mainPages.includes(item.slug));

  const paths = result.map((item) => ({ slug: item.slug }));

  return paths;
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const {meta, slug } = await getPageData(params.slug);
  return {
    title: meta.title,
    description: meta.description,
  };
};


const getPageData = async (slug: string) => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=${slug}`
  );
  const { docs }: Page = await res.json();
  return docs[0];
};

type Params = {
  params: {
    slug: string;
  }
};

const LandingPage: FC<Params> = async ({
  params: {
    slug
  }
}) => {
  const { customComponents } = await getPageData(slug);
  return <LCustomComponents field={customComponents} />;
};

export default LandingPage;
