import { Project } from '@/interfaces';
import React from 'react'
import MProjectItem from '@/components/molecules/MProjectItem';
import styles from 'theme/components/organisms/CProjectList.module.css'
import classNames from 'classnames';
import { Button } from '@/interfaces';
import { Upload } from '@/interfaces';

type Props = {
  field: {
    projectsList: Project[],
    id: string;
    name?: string;
    mediaUrl?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    button: Button;
    media: Upload;
  }
}

const CProjectList = ({ field: { projectsList, ...main } }: Props) => {

  return (
    <section className={classNames(styles['c-project-list'], 'o-container o-container--lg my-16')}>

      {main && <MProjectItem key={main.id} field={main} main /> }

      <div id="list" className={styles['c-project-list--list-counter']}>
      {
        projectsList?.map((field) => (
          <MProjectItem key={field.id} field={field} />
        ))
      }
      </div>
    </section>
  )
}

export default CProjectList