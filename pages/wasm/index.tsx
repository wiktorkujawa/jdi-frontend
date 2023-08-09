import CFooter, { IFooterData } from "@/components/organisms/CFooter";
import CHeader from "@/components/organisms/CHeader";
import { getLayout } from "@/features/LayoutData";
import { IData, Page, PageContent } from "@/interfaces";
import { FC } from "react";
import CHead from "@/components/organisms/CHead";
import LCustomComponents from "@/components/templates/LCustomComponents";
import CHeadingCopyBlock from "@/components/organisms/CHeadingCopyBlock";
import CProjectList from "@/components/organisms/CProjectList";

export const getStaticProps = async () => {
  const getPageData = async () => {
    const res = await fetch(
      `${process.env.API_URL}pages?where[slug][equals]=wasm`
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

const Wasm: FC<IProps> = ({
  layoutData: [navData, footerData],
  pageData: { customComponents, slug, meta, subpages },
}) => {
  return (
    <>
      {meta && <CHead meta={meta} slug={slug} />}
      <CHeader data={navData} />
      <main>
        <div className="relative h-screen o-container o-container--lg my-16">
          <CHeadingCopyBlock
            field={{
              level: "h1",
              heading: "Web Assembly",
              copy: [
                {
                  text: "Discover the power of Web Assembly (WASM) apps - revolutionizing web development with enhanced interactivity and performance.",
                  type: "p",
                  indent: 0,
                },
              ],
            }}
          />
          <CProjectList
            // @ts-ignore
            field={{
              projectsList:
                subpages?.map((subpage) => {
                  return {
                    name: subpage.name,
                    media: subpage.meta.image,
                    button: {
                      text: "Check it out",
                      url: subpage.slug,
                    },
                    createdAt: subpage.createdAt,
                    id: subpage.id,
                    updatedAt: subpage.updatedAt,
                  };
                }) || [],
            }}
          />
        </div>
        <div />
        <LCustomComponents field={customComponents} />
      </main>
      <CFooter data={footerData} />
    </>
  );
};

export default Wasm;
