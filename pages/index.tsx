import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHead from "@/components/organisms/CHead";
import CHeader from "@/components/organisms/CHeader";
import CHeadingCopyBlock from "@/components/organisms/CHeadingCopyBlock";
import CProjectList from "@/components/organisms/CProjectList";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { getLayout } from "@/features/LayoutData";
import {
  Button,
  ICopy,
  IData,
  Page,
  PageContent,
  Project,
  Upload,
} from "@/interfaces";
import React, { FC } from "react";
import styles from "theme/page.module.css";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=/`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };
  const getBriefData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/brief`);
    const data: any = await res.json();
    return data;
  };
  const getProjectsData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/projectList`);
    return res.json();
  };

  const [briefData, pageData, projectsData, layoutData] = await Promise.all([
    getBriefData(),
    getPageData(),
    getProjectsData(),
    getLayout(),
  ]);

  return {
    props: {
      briefData,
      pageData,
      projectsData,
      layoutData,
    },
  };
};

type IProps = {
  briefData: {
    heading: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5";
    copy: ICopy[];
    blockName?: string;
    arrowScroll?: string;
  };
  pageData: PageContent;
  projectsData: {
    projectsList: Project[];
    id: string;
    name?: string;
    mediaUrl?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    button: Button;
    media: Upload;
  };
  layoutData: [IData, IFooterData];
};

const Home: FC<IProps> = ({
  briefData,
  pageData: { customComponents, meta, slug },
  projectsData,
  layoutData: [navData, footerData],
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <CHeader data={navData} />
      <main className={styles.main}>
        <CHeadingCopyBlock field={{ ...briefData, arrowScroll: "list" }} />
        <CProjectList field={projectsData} />
        <LCustomComponents field={customComponents} />
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default Home;
