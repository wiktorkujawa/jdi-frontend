import { GroupElement, Project } from "@/interfaces";
import React, { useMemo } from "react";
import MProjectItem from "@/components/molecules/MProjectItem";
import styles from "theme/components/organisms/CProjectList.module.css";
import classNames from "classnames";
import { Button } from "@/interfaces";
import { Upload } from "@/interfaces";

type ProjectListProps = {
    projectsList: Project[];
    id: string;
    name?: string;
    mediaUrl?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    buttons: GroupElement<Button, "button">[];
    button: Button;
    media: Upload;
};

  const getProjectsData = async () => {
    const res = await fetch(`${process.env.API_URL}globals/projectList`, {
      next: {
        tags: ["projectsList"],
      },
    });
    const data: ProjectListProps = await res.json();
    return data;
  };

const CProjectList = async () => {
  const { projectsList, ...main } = await getProjectsData();
  return (
    <section
      className={classNames(
        styles["c-project-list"],
        "o-container o-container--lg my-16"
      )}
    >
    { Object.keys(main).length !== 0 && <MProjectItem key={main.id} field={main} main={Object.keys(main).length !== 0} />}
      <div id="list" className={styles["c-project-list--list-counter"]}>
        {projectsList?.map((field) => (
          <MProjectItem key={field.id} field={field} />
        ))}
      </div>
    </section>
  );
};

export default CProjectList;
