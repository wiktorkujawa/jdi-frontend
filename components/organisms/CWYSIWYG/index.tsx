import { ICopy } from "@/interfaces";
import dynamic from "next/dynamic";
import { FC } from "react";

const ORichText = dynamic(() => import('@/features/ORichText'));
const LContainer = dynamic(() => import('@/components/templates/LContainer'));

// type upload:
// value -> mimeType: if includes image sizes [ thumbnail card or tablet -> url and filename] else url

// type relationship:
// realtionTo and value -> dynamic component

// children or value


type Props = {
  field: {
    copy: ICopy[];
  };
};

const CWYSIWYG: FC<Props> = ({ field: { copy } }) => {

  return (
    <section className={"c-wysiwyg my-16 o-container o-container--lg"}>
      <LContainer>
        <ORichText copy={copy} />
      </LContainer>
    </section>
  );
};

export default CWYSIWYG;