import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHead from "@/components/organisms/CHead";
import CHeader from "@/components/organisms/CHeader";
import LCustomComponents from "@/components/templates/LCustomComponents";
import { getLayout } from "@/features/LayoutData";
import useCanvasScroll from "@/hooks/useCanvasScroll";
import { IData, Page, PageContent } from "@/interfaces";
import { FC, useEffect, useState } from "react";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm%2Fc-app`
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
      pageData
    },
  };
};

type IProps = {
  pageData: PageContent;
  layoutData: [IData, IFooterData];
};

const CApp: FC<IProps> = ({
  layoutData: [navData, footerData],
  pageData: { customComponents, slug, meta },
}) => {
  const [startApp, setStartApp] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      window.scrollBy(0, event.deltaY);
    };
    const InitWasm = async () => {
      const Module = (await import("scriptjs")).default;

      Module.get("../assets/wasm/index.js", () => {
        console.log("index loaded");
      });
      Module.get("../assets/wasm/runIndex.js", () => {
        console.log("run index loaded");
      });
        document
          ?.getElementById('canvas')
          ?.addEventListener("wheel", handleScroll);
  
    };
    setTimeout(() => setStartApp(true), 1000);
    if (typeof document !== "undefined" && startApp) {
      InitWasm();
    }
    () => {
      document
        ?.getElementById('canvas')
        ?.removeEventListener("wheel", handleScroll);
    };
  }, [startApp]);

  useCanvasScroll('canvas');

  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <CHeader data={navData} />
      <main>
        <div>
          {startApp && (
            <div className="mx-4 overflow-x-auto">
              <canvas
                className="emscripten min-w-[1024px]"
                id="canvas"
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          )}
        </div>
        <LCustomComponents field={customComponents} />
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default CApp;
