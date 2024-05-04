import { GroupElement, Project } from "@/interfaces";
import MProjectItem from "@/components/molecules/MProjectItem";
import styles from "./CProjectList.module.css";
import clsx from "clsx";
import { Button, Upload } from "@/interfaces";

type Props = {
  field: {
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
};

const CProjectList = ({ field: { projectsList, ...main } }: Props) => {

  const isMain = Object.keys(main).length !== 0;

  return (
    <section
      className={clsx(
        styles["c-project-list"],
        "o-container o-container--lg my-16"
      )}
    >
      {isMain && <MProjectItem key={main.id} field={main} main={isMain} />}

      <div id="list" className={styles["c-project-list--list-counter"]}>
        {projectsList?.map((field) => (
          <MProjectItem key={field.id} field={field} />
        ))}
      </div>
    </section>
  );
};

export default CProjectList;