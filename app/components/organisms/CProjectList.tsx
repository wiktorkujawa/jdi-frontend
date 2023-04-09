import { Project } from '@/interfaces';
import React from 'react'
import MProjectItem from '../molecules/MProjectItem';
import styles from 'theme/components/organisms/CProjectList.module.css'
import classNames from 'classnames';

const getProjects = async () => {
  const res = await fetch(`${process.env.API_URL}projects`,
  {
    next: {
      revalidate: 60
    }
  });
  const { docs }: Project = await res.json();
  return docs;
};

const CProjectList = async () => {
  const projects = await getProjects();

  return (
    <section className={classNames(styles['c-project-list'], 'flex flex-wrap o-container o-container--lg my-16')}>
      {
        projects.map((field) => (
          <MProjectItem key={field.id} field={field} />
        ))
      }
    </section>
  )
}

export default CProjectList