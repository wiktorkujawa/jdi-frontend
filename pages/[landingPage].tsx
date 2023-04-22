import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHead from "@/components/organisms/CHead";
import CHeader from "@/components/organisms/CHeader";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { getLayout } from "@/features/LayoutData";
import { IData, Page, PageContent } from "@/interfaces";
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

  const [pageData, layoutData] = await Promise.all([
    getPageData(context?.params?.landingPage),
    getLayout(),
  ]);

  return {
    props: {
      pageData: pageData[0],
      layoutData,
    },
  };
};

type IProps = {
  pageData: PageContent;
  layoutData: [IData, IFooterData];
};

const LandingPage: FC<IProps> = ({
  pageData: { meta, customComponents, slug },
  layoutData: [navData, footerData],
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <CHeader data={navData} />
      <main className={classNames(styles.main)}>
        <LCustomComponents field={customComponents} />
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default LandingPage;
