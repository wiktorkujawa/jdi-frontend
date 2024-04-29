import LCustomComponents from "@/components/templates/LCustomComponents";
import { Page, PageContent } from "@/interfaces";
import React, { FC } from "react";
import { Metadata } from "next";
import { generateMeta } from "@/features/metadata";
import { notFound } from "next/navigation";

const mainPages = ["/", "experience", "wasm", ""];

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}pages`);
  const { docs } = await res.json();

  const result: PageContent[] = docs.filter((item: any) => !mainPages.includes(item.slug));

  const paths = result.map((item) => ({ slug: item.slug }));

  return paths;
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const pageData = await getPageData(params.slug);
    if (!pageData) return notFound();
    const { meta, slug } = pageData;
    return generateMeta(meta, slug);
};


const getPageData = async (slug: string) => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=${slug}`
  );
  if (!res.ok) return undefined;
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
  const data = await getPageData(slug);
  if(!data) return notFound();
  return <LCustomComponents field={data.customComponents} />;
};

export default LandingPage;
