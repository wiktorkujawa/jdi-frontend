import ORichText from "@/app/features/ORichText";
import React from "react";
import Asvg from "../atoms/ASvg";
import LContainer from "../templates/LContainer";

type Props = {
  field: {
    heading: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5";
    copy: ICopy[];
    blockName?: string;
    arrowScroll?: string;
  };
};

interface ICopy {
  type?: string;
  text?: string;
  value?: any;
  children?: ICopy[];
  indent: number;
  doc?: any;
  url?: string;
  relationTo?: string;
  newTab?: boolean;
}

const CHeadingCopyBlock = ({ field: { copy, heading, level, blockName, arrowScroll } }: Props) => {
  return (
    <section className="c-heading-copy-block s-wysiwyg my-16 o-container o-container--lg">
      <LContainer>
        { arrowScroll ?<a href={'#'+arrowScroll} className="right-8 sm:right-16 top-24 sm:top-12 absolute">
          <Asvg className="dark:fill-white w-full scale-150 fill-black hover:fill-red-hover dark:hover:fill-red-hover" name={'arrow-down-circle-thin'} />
        </a> : null }
        {React.createElement(
          level,
          {
            className: "text-center font-bold mb-10",
            id: blockName
          },
          heading
        )}

        <ORichText copy={copy} />
      </LContainer>
    </section>
  );
};

export default CHeadingCopyBlock;
