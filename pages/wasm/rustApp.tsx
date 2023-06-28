import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHeader from "@/components/organisms/CHeader";
import { getLayout } from "@/features/LayoutData";
import { IData, Page } from "@/interfaces";
import { FC, useEffect, useRef } from "react";
import init from "@/public/assets/wasm/web/eframe_template";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm`
    );
    const { docs }: Page = await res.json();
    return docs[0];
  };

  const [layoutData] = await Promise.all([
    // getPageData(),
    getLayout(),
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
      <CHeader data={navData} />
      <main>
      <div className="relative h-screen o-container o-container--lg my-16">
        <canvas className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-wasm-app h-full" id="the_canvas_id"/>
      </div>
      <div/>
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default Wasm;
