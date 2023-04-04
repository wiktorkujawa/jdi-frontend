import { notFound } from "next/navigation";
import { Page } from "@/interfaces";
import React from "react";
import CCustomComponent from "../components/organisms/CCustomComponent";
import styles from "theme/about/page.module.css";
import classNames from "classnames";

const getData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[name][equals]=About`,
    {
      next: {
        revalidate: 60
      }
    }
  );

  const { docs }: Page = await res.json();

  return docs;
};

const About = async () => {
  const [data] = await getData();

  if (!data) {
    notFound();
  }
  return (
    <main className={classNames(styles.main)}>
      {data.customComponents.map(({ id, ...field }) => {
        // eslint-disable-next-line react/no-children-prop
        return <CCustomComponent key={id} field={field} />;
      })}
    </main>
  );
};
export default About;
