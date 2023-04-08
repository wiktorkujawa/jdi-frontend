import CCustomComponent from '@/app/components/organisms/CCustomComponent';
import CHeadingCopyBlock from '@/app/components/organisms/CHeadingCopyBlock';
import CProjectList from '@/app/components/organisms/CProjectList';
import { Page } from '@/interfaces';
import React from 'react'
import styles from "theme/page.module.css";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(`${process.env.API_URL}pages?where[slug][equals]=/`);
    const { docs }: Page = await res.json();
    return docs[0];
  }
  const getBriefData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/brief`);
    return res.json();
  }
  const [briefData, pageData] = await Promise.all([
    getBriefData(),
    getPageData(),
  ]);
  return {
    props: {
      briefData,
      pageData
    }
  }
}

const Home = ({ briefData, pageData }: any) => {

  console.log(briefData, pageData);
  return (
    <main className={styles.main}>
        <CHeadingCopyBlock field={briefData} />
        {/* @ts-expect-error Async Server Component
        <CProjectList /> */}

        {pageData?.customComponents.map(({ id, ...field }: any) => {
          return <CCustomComponent key={id} field={field} />;
        })}
      </main>
  )
}

export default Home