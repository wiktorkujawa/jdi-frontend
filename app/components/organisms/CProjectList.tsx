import { Project } from '@/interfaces';
import React from 'react'
import MProjectItem from '../molecules/MProjectItem';

const getProjects = async () => {
  const res = await fetch(`${process.env.API_URL}projects`);
  const { docs }: Project = await res.json();
  return docs;
};

const CProjectList = async () => {
  const projects = await getProjects();

  return (
    <section className='c-project-list flex flex-wrap o-container o-container--lg my-16'>
      {
        projects.map((field) => (
          <MProjectItem key={field.id} field={field} />
        ))
      }
    </section>
  )
}

export default CProjectList