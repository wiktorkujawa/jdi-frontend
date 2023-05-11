import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHeader from "@/components/organisms/CHeader";
import { getLayout } from "@/features/LayoutData";
import { IData, Page } from "@/interfaces";
import { FC, useEffect, useRef } from "react";
import init from "@/public/assets/wasm/web/wasm-test";

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
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      init().catch((error) => {
        if (!error.message.startsWith("Using exceptions for control flow,")) {
          throw error;
        }
      }).finally(() => {
        const canvas = document.querySelector("canvas") as unknown;
        appRef.current?.appendChild(canvas as HTMLCanvasElement);
      });
    }
  }, []);

  return (
    <>
      <CHeader data={navData} />
      <main>
        <div>
            <div ref={appRef} className="mx-4 overflow-x-auto child:mx-auto"/>
        </div>
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default Wasm;
