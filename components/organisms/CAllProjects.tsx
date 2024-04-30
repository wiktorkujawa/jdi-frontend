import { GroupElement, Project } from "@/interfaces";
import { Button, Upload } from "@/interfaces";
import CProjectList from "@/components/organisms/CProjectList";

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

const CAllProjects = async () => {
  const { projectsList, ...main } = await getProjectsData();
  return (
    <CProjectList field={{
      projectsList: projectsList,
      ...main
    }} />
  );
};

export default CAllProjects;
