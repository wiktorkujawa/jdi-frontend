import React, { FC } from "react";
import dynamic from "next/dynamic";
import { CustomComponentType } from "@/interfaces";

const DynamicComponent = (componentName: string) =>
  dynamic(() => import(`./C${componentName}`));

const CCustomComponent: FC<CustomComponentType> = ({ field }) => {
  return React.createElement(DynamicComponent(field?.blockType), {
    // @ts-ignore
    field: field,
  });
};

export default CCustomComponent;
