import Image from "next/image";

import styles from "theme/page.module.css";
import { Page } from "@/interfaces";
import CCustomComponent from "./components/organisms/CCustomComponent";
import CProjectList from "./components/organisms/CProjectList";
import CBrief from "./components/organisms/CBrief";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pages?where[slug][equals]=/`);
  const { docs }: Page = await res.json();
  return docs;
};

export default async function Home() {
  const [data] = await getData();

  return (
    <main className={styles.main}>
      {/* @ts-expect-error Async Server Component */}
      <CBrief />
      {/* @ts-expect-error Async Server Component */}
      <CProjectList />

      {data.customComponents.map(({ id, ...field }) => {
        return <CCustomComponent key={id} field={field} />;
      })}
    </main>
  );
}
