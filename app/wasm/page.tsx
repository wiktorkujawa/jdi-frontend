import { Page } from "@/interfaces";
import LCustomComponents from "@/components/templates/LCustomComponents";
import CHeadingCopyBlock from "@/components/organisms/CHeadingCopyBlock";
import CProjectList from "@/components/organisms/CProjectList";
import { generateMeta } from "@/features/metadata";

const getPageData = async () => {
  const res = await fetch(
    `${process.env.API_URL}pages?where[slug][equals]=wasm`
  );
  const { docs }: Page = await res.json();
  return docs[0];
};

export const generateMetadata = async () => {
  const { meta, slug } = await getPageData();
  return generateMeta(meta, slug);
};


const Wasm = async () => {
  const { customComponents, subpages } = await getPageData();
  console.log(subpages);
  return (
    <>
      <div className="relative o-container o-container--lg my-16">
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
                  mediaUrl: subpage.slug,
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
    </>
  );
};

export default Wasm;
