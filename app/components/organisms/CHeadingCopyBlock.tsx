import ORichText from "@/app/features/ORichText";
import React from "react";
import LContainer from "../templates/LContainer";

type Props = {
  field: {
    heading: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5";
    copy: ICopy[];
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

const CHeadingCopyBlock = ({ field: { copy, heading, level } }: Props) => {
  return (
    <section className="c-heading-copy-block s-wysiwyg my-16 o-container o-container--lg">
      <LContainer>
        {React.createElement(
          level,
          {
            className: "text-center font-bold mb-10",
          },
          heading
        )}

        <ORichText copy={copy} />
      </LContainer>
    </section>
  );
};

export default CHeadingCopyBlock;
