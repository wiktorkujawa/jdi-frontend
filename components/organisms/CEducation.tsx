import React from 'react'
import LContainer from '../templates/LContainer'

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

const getEducationData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/education`);
  const data: IEducation = await res.json();
  return data;
};

const CEducation = async () => {
  const { header, institutions} = await getEducationData();
  return (
    <section className="my-16 o-container o-container--lg">
          <LContainer>
            <h1 className="text-h1 text-center mb-16 font-bold">
              {header}
            </h1>
            <ul>
              {institutions?.map((item) => (
                <li className="mb-10" key={item.id}>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </LContainer>
        </section>
  )
}
export default CEducation;

