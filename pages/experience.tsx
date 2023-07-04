import { IData, Page, PageContent } from "@/interfaces";
import React, { FC } from "react";
import LContainer from "../components/templates/LContainer";
import CHead from "@/components/organisms/CHead";
import LCustomComponents from "@/components/templates/LCustomComponents";

interface IExperience {
  header: string;
  positions: [
    {
      id: string;
      position: string;
      description: string;
    }
  ];
}

interface IEducation {
  header: string;
  institutions: [
    {
      id: string;
      name: string;
      description: string;
    }
  ];
}

type IProps = {
  experience: IExperience;
  education: IEducation;
  pageData: PageContent;
};

export const getStaticProps = async () => {
  const getExperienceData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/experience`);
    const data: IExperience = await res.json();
    return data;
  };

  const getEducationData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/education`);
    const data: IEducation = await res.json();
    return data;
  };

  const getCustomData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=experience`
    );

    const { docs }: Page = await res.json();

    return docs[0];
  };

  const [experience, education, pageData] = await Promise.all([
    getExperienceData(),
    getEducationData(),
    getCustomData()
  ]);

  return {
    props: {
      experience,
      education,
      pageData
    },
  };
};

const Experience: FC<IProps> = ({
  experience,
  education,
  pageData: { customComponents, slug, meta },
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <main className="p-experience">
        <section className="my-16 o-container o-container--lg">
          <LContainer>
            <h1 className="text-h1 text-center mb-16 font-bold">
              {experience.header}
            </h1>
            <ul>
              {experience.positions.map((item) => (
                <li className="mb-10" key={item.id}>
                  <strong>{item.position}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </LContainer>
        </section>

        <section className="my-16 o-container o-container--lg">
          <LContainer>
            <h1 className="text-h1 text-center mb-16 font-bold">
              {education.header}
            </h1>
            <ul>
              {education.institutions.map((item: any) => (
                <li className="mb-10" key={item.id}>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </LContainer>
        </section>
        <LCustomComponents field={customComponents} />
      </main>
    </>
  );
};

export default Experience;
