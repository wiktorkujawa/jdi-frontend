import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { Page } from "@/interfaces";
const mainPages = ['/','about'];

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}pages`);
  const { docs } = await res.json();

  const result = docs.filter(
    (item: any) => !mainPages.includes(item.slug)
  );

  return result.map((item: any) => ({
    landingPage: item.slug
  }));
}

const getData = async (page: string) => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=${page}`
  );

  const { docs }: Page = await res.json();

  return docs;
};

const LandingPage = async ({ params }: any) => {
  const { landingPage } = params;
  const [data] = await getData(landingPage);

  
  if (!data) {
    notFound();
  }

  return <main className={styles.main}>{ data.name }</main>;
};
export default LandingPage;
