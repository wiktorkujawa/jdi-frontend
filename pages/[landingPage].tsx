import CHead from "@/components/organisms/CHead";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { Page, PageContent } from "@/interfaces";
import classNames from "classnames";
import React, { FC } from "react";
import styles from "theme/[landingPage]/page.module.css";

const mainPages = ["/", "experience", "wasm"];

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}pages`);
  const { docs } = await res.json();

  const result = docs.filter((item: any) => !mainPages.includes(item.slug));

  const paths = result.map((item: any) => ({
    params: {
      landingPage: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const getPageData = async (page: string) => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=${page}`
    );
    const { docs }: Page = await res.json();
    return docs;
  };

  const [pageData] = await Promise.all([
    getPageData(context?.params?.landingPage),
  ]);

  return {
    props: {
      pageData: pageData[0]
    },
  };
};

type IProps = {
  pageData: PageContent;
};

const LandingPage: FC<IProps> = ({
  pageData: { meta, customComponents, slug }
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <main className={classNames(styles.main)}>
        <LCustomComponents field={customComponents} />
      </main>
    </>
  );
};

export default LandingPage;
