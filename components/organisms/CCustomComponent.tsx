'use client';
import React, { FC } from "react";
// import dynamic from "next/dynamic";

import loadable from '@loadable/component'

const DynamicComponent = loadable((props: any) => import(`./C${props.field.blockType}`), {
  cacheKey: props => props.field,
  ssr: false
})

// const DynamicComponent = (componentName: string) =>
//   dynamic(() => import(`./C${componentName}`));

const CCustomComponent: FC<{ field: any }> = ({ field }) => {
  // return React.createElement(DynamicComponent(field?.blockType), {
  //   // @ts-ignore
  //   field: field,
  // });

  return <DynamicComponent field={field}/>
};

export default CCustomComponent;
