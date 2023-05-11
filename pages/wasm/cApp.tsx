import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHeader from "@/components/organisms/CHeader";
import { getLayout } from "@/features/LayoutData";
import { IData, Page } from "@/interfaces";
import { FC, useEffect, useState } from "react";

export const getStaticProps = async () => {

  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };

  const [ layoutData] = await Promise.all([
    // getPageData(),
    getLayout()
  ]);

  return {
    props: {
      layoutData,
    },
  };
};

type IProps = {
  layoutData: [IData, IFooterData];
};

const Wasm: FC<IProps> = ({ layoutData: [navData, footerData] }) => {
  const [startApp, setStartApp] = useState(false);

  useEffect(() => {
    const InitWasm = async () => {
      const Module = (await import("scriptjs")).default;

      Module.get("../assets/wasm/index.js", () => {
        console.log("index loaded");
      });
      Module.get("../assets/wasm/runIndex.js", () => {
        console.log("run index loaded");
      });
    };
    setTimeout(() => setStartApp(true), 1000);
    if (typeof document !== "undefined" && startApp) {
      InitWasm();
    }
  }, [startApp]);

  return (
    <>
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
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default Wasm;