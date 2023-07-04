import { Page, PageContent } from "@/interfaces";
import { FC, useEffect } from "react";
import init from "@/public/assets/wasm/web/eframe_template";
import CHead from "@/components/organisms/CHead";
import LCustomComponents from "@/components/templates/LCustomComponents";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm%2Fem-2d`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };

  const [pageData] = await Promise.all([
    getPageData(),
  ]);

  return {
    props: {
      pageData,
    },
  };
};

type IProps = {
  pageData: PageContent;
};

const EM2D: FC<IProps> = ({
  pageData: { customComponents, slug, meta },
}) => {
  useEffect(() => {
    // if (typeof document !== "undefined") {
    init().catch((error) => {
      if (!error.message.startsWith("Using exceptions for control flow,")) {
        throw error;
      }
    });
    // }
  }, []);

  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <main>
        <div className="relative h-screen o-container o-container--2xl my-16">
          <canvas
            className="absolute left-1/2 -translate-x-1/2 top-0 max-w-wasm-app h-full"
            id="the_canvas_id"
          />
        </div>
        <div />
        <LCustomComponents field={customComponents} />
      </main>
    </>
  );
};

export default EM2D;
