import CApp from "@/components/organisms/CApp";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { generateMeta } from "@/features/metadata";
import { Page } from "@/interfaces";

const getPageData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=wasm%2Fc-app`
  );
  const { docs }: Page = await res.json();
  return docs[0];
};

export const generateMetadata = async () => {
  const { meta, slug } = await getPageData();
  return generateMeta(meta, slug);
};

const Page = async () => {
  const { customComponents } = await getPageData();

  return (
    <>
      <CApp />
      <LCustomComponents field={customComponents} />
    </>
  );
};

export default Page;
