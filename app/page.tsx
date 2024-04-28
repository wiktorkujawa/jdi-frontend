import CAllProjects from "@/components/organisms/CAllProjects";
import CBriefData from "@/components/organisms/CBriefData";
import LCustomComponents from "@/components/templates/LCustomComponents";
import {
  Page,
} from "@/interfaces";
import { Metadata } from "next";
import React from "react";
import styles from "theme/page.module.css";

const getPageData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]= `
  );
  const { docs }: Page = await res.json();
  return docs[0];
};

export const generateMetadata  = async (): Promise<Metadata> => {
  const { meta } = await getPageData();
  return {
    title: meta.title,
    description: meta.description,
  };
};

const Home = async () => {
  const { customComponents } = await getPageData();

  return (
    <>
      <main className={styles.main}>
        <CBriefData arrowScroll="list" />
        <CAllProjects />
        <LCustomComponents field={customComponents} />
      </main>
    </>
  );
};

export default Home;
