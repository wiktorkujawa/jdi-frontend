import styles from "theme/page.module.css";
import { Page } from "@/interfaces";
import CCustomComponent from "./components/organisms/CCustomComponent";
import CProjectList from "./components/organisms/CProjectList";
import CHeadingCopyBlock from "./components/organisms/CHeadingCopyBlock";
import { Metadata } from "next";

const getPageData = async () => {
  const res = await fetch(`${process.env.API_URL}pages?where[slug][equals]=/`, {
    next: {
      revalidate: 60,
    },
  });
  const { docs }: Page = await res.json();
  return docs[0];
};

const getBriefData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/brief`);
  const data: any = await res.json();
  return data;
};

export default async function Home() {
  // Wait for the promises to resolve
  const [briefData, pageData] = await Promise.all([
    getBriefData(),
    getPageData(),
  ]);

  return (
    <>
      <main className={styles.main}>
        <CHeadingCopyBlock field={briefData} />
        {/* @ts-expect-error Async Server Component */}
        <CProjectList />

        {pageData?.customComponents.map(({ id, ...field }) => {
          return <CCustomComponent key={id} field={field} />;
        })}
      </main>
    </>
  );
}

export const metadata: Metadata = {
  title: "My app",
  description:
    "Explore the portfolio of a skilled web developer showcasing their expertise in creating visually stunning and functional websites. From responsive designs to seamless user experience, discover how this developer can bring your online presence to life. Hire a web developer who can turn your ideas into reality",
  viewport: "width=device-width, initial-scale=1",
  icons: [
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicon-16x16.png",
    },
    { rel: "manifest", url: "/site.webmanifest" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
};
