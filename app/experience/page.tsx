import { Page } from "@/interfaces";
import LCustomComponents from "@/components/templates/LCustomComponents";
import CEducation from "@/components/organisms/CEducation";
import CExperience from "@/components/organisms/CExperience";
import { generateMeta } from "@/features/metadata";


const getCustomData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=experience`
  );

  const { docs }: Page = await res.json();

  return docs[0];
};

 export const generateMetadata = async () => {
  const { meta, slug } = await getCustomData();
  return generateMeta(meta, slug);
};

const Experience = async () => {
  const { customComponents } = await getCustomData();
  return (
    <>
      <CExperience />
      <CEducation />
      <LCustomComponents field={customComponents} />
    </>
  );
};

export default Experience;
