import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHeader from "@/components/organisms/CHeader";
import { getLayout } from "@/features/LayoutData";
import { IData, Page, PageContent } from "@/interfaces";
import { FC, useEffect } from "react";
import init from "@/public/assets/wasm/web/eframe_template";
import CHead from "@/components/organisms/CHead";
import LCustomComponents from "@/components/templates/LCustomComponents";
import useCanvasScroll from "@/hooks/useCanvasScroll";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm%2Fem-2d`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };

  const [pageData, layoutData] = await Promise.all([
    getPageData(),
    getLayout(),
  ]);

  return {
    props: {
      layoutData,
      pageData,
    },
  };
};

type IProps = {
  pageData: PageContent;
  layoutData: [IData, IFooterData];
};

const EM2D: FC<IProps> = ({
  layoutData: [navData, footerData],
  pageData: { customComponents, slug, meta },
}) => {
  useEffect(() => {
    init().catch((error) => {
      if (!error.message.startsWith("Using exceptions for control flow,")) {
        throw error;
      }
    });

  }, []);

  useCanvasScroll();

  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <CHeader data={navData} />
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
      <CFooter data={footerData} />
    </>
  );
};

export default EM2D;
