import CHead from "@/components/organisms/CHead";
import CHeadingCopyBlock from "@/components/organisms/CHeadingCopyBlock";
import CProjectList from "@/components/organisms/CProjectList";
import LCustomComponents from "@/components/templates/LCustomComponents";
import {
  Button,
  ICopy,
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

  const [briefData, pageData, projectsData] = await Promise.all([
    getBriefData(),
    getPageData(),
    getProjectsData(),
  ]);

  return {
    props: {
      briefData,
      pageData,
      projectsData
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
};

const Home: FC<IProps> = ({
  briefData,
  pageData: { customComponents, meta, slug },
  projectsData
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <main className={styles.main}>
        <CHeadingCopyBlock field={{ ...briefData, arrowScroll: "list" }} />
        <CProjectList field={projectsData} />
        <LCustomComponents field={customComponents} />
      </main>
    </>
  );
};

export default Home;
