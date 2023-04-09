import { Page } from "@/interfaces";
import React from "react";
import CCustomComponent from "../components/organisms/CCustomComponent";
import LContainer from "../components/templates/LContainer";

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

const getExperienceData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/experience`, {
    next: {
      revalidate: 60,
    },
  });
  const data: IExperience = await res.json();
  return data;
};

const getEducationData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/education`, {
    next: {
      revalidate: 60,
    },
  });
  const data: IEducation = await res.json();
  return data;
};

const getCustomData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=experience`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const { docs }: Page = await res.json();

  return docs[0]?.customComponents;
};

const Experience = async () => {
  const experienceData = getExperienceData();
  const educationData = getEducationData();
  const customData = getCustomData();

  // Wait for the promises to resolve
  const [experience, education, customComponents] = await Promise.all([
    experienceData,
    educationData,
    customData,
  ]);

  return (
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
            {education.institutions.map((item) => (
              <li className="mb-10" key={item.id}>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </LContainer>
      </section>
      {customComponents.map(({ id, ...field }) => {
        // eslint-disable-next-line react/no-children-prop
        return <CCustomComponent key={id} field={field} />;
      })}
    </main>
  );
};

export default Experience;
