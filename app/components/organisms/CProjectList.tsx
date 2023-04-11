import { Project } from '@/interfaces';
import React from 'react'
import MProjectItem from '../molecules/MProjectItem';
import styles from 'theme/components/organisms/CProjectList.module.css'
import classNames from 'classnames';

const getProjects = async () => {
  const res = await fetch(`${process.env.API_URL}globals/projectList`,
  {
    next: {
      revalidate: 60
    }
  });
  return res.json();
};

const CProjectList = async () => {
  const { projectsList, ...main } = await getProjects();

  return (
    <section className={classNames(styles['c-project-list'], 'o-container o-container--lg my-16')}>

      {main && <MProjectItem key={main.id} field={main} main /> }

      <div id="list" className={styles['c-project-list--list-counter']}>
      {
        projectsList?.map((field: Project) => (
          <MProjectItem key={field.id} field={field} />
        ))
      }
      </div>
    </section>
  )
}

export default CProjectList