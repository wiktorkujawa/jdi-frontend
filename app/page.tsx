import CAllProjects from "@/components/organisms/CAllProjects";
import CBriefData from "@/components/organisms/CBriefData";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { generateMeta } from "@/features/metadata";
import {
  Page,
} from "@/interfaces";
import { Metadata } from "next";

const getPageData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]= `
  );
  const { docs }: Page = await res.json();
  return docs[0];
};

export const generateMetadata  = async (): Promise<Metadata> => {
  const { meta, slug } = await getPageData();
  return generateMeta(meta, slug);
};

const Home = async () => {
  const { customComponents } = await getPageData();

  return (
    <>
        <CBriefData arrowScroll="list" />
        <CAllProjects />
        <LCustomComponents field={customComponents} />
    </>
  );
};

export default Home;
