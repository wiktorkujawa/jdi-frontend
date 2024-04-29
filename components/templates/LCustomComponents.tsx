import { FC } from "react";
import CCustomComponent from "@/components/organisms/CCustomComponent";

const LCustomComponents: FC<{ field: any }> = ({ field }) => {
  return (
    <div className="l-custom-components">
      {field.map(({ id, ...block }: any) => (
        <CCustomComponent key={id} field={block} />
      ))}
    </div>
  );
};

export default LCustomComponents;
