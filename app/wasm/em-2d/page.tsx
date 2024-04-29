import { Page } from "@/interfaces";
import LCustomComponents from "@/components/templates/LCustomComponents";
import CEm2D from "@/components/organisms/CEm2D";

  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm%2Fem-2d`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };


const EM2D = async () => {
  const {customComponents} = await getPageData();

  return (
    <>
        <CEm2D />
        <LCustomComponents field={customComponents} />
    </>
  );
};

export default EM2D;
