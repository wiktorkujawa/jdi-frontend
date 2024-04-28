'use client';
import React, { FC } from "react";
// import dynamic from "next/dynamic";

import loadable from '@loadable/component'
import { CustomComponentType } from "@/interfaces";



const DynamicComponent = loadable((props: CustomComponentType) => import(`./C${props.field.blockType}`));

// const DynamicComponent = (componentName: string) =>
//   dynamic(() => import(`./C${componentName}`));

const CCustomComponent: FC<CustomComponentType> = ({ field }) => {
  // return React.createElement(DynamicComponent(field?.blockType), {
  //   // @ts-ignore
  //   field: field,
  // });

  return <DynamicComponent field={field}/>
};

export default CCustomComponent;
