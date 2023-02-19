import styles from "./page.module.css";
import { notFound } from 'next/navigation';
import { Page } from "@/interfaces";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}pages?where[name][equals]=About`);

  const { docs }: Page = await res.json();
  
  return docs;
};

const About = async () => {
  const [ data ] = await getData();

  if(!data) {
    notFound();
  }
  return <main className={styles.main}>{ data?.name }</main>;
};
export default About;
