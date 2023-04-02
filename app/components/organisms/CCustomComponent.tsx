import React, { FC } from "react";
import dynamic from "next/dynamic";

const DynamicComponent = (componentName: string) =>
  dynamic(() => import(`./C${componentName}`));

const CCustomComponent: FC<{ field: any }> = ({ field }) => {
  return React.createElement(DynamicComponent(field.blockType), {
    // @ts-ignore
    field: field,
  });
};

export default CCustomComponent;
