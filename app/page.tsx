import styles from "theme/page.module.css";
import { Page } from "@/interfaces";
import CCustomComponent from "./components/organisms/CCustomComponent";
import CProjectList from "./components/organisms/CProjectList";
import CHeadingCopyBlock from "./components/organisms/CHeadingCopyBlock";

const getCustomData = async () => {
  const res = await fetch(`${process.env.API_URL}pages?where[slug][equals]=/`,
  {
    next: {
      revalidate: 60
    }
  });
  const { docs }: Page = await res.json();
  return docs[0]?.customComponents;
};

const getBriefData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/brief`);
  const data: any = await res.json();
  return data
}

export default async function Home() {
  const customData = getCustomData();
  const briefData = getBriefData();

  // Wait for the promises to resolve
  const [brief, customComponents] = await Promise.all([briefData, customData]);

  return (
    <main className={styles.main}>
      <CHeadingCopyBlock field={brief}/>
      {/* @ts-expect-error Async Server Component */}
      <CProjectList />

      {customComponents.map(({ id, ...field }) => {
        return <CCustomComponent key={id} field={field} />;
      })}
    </main>
  );
}
