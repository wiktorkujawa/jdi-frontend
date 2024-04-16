import React, { FC } from "react";
// import dynamic from "next/dynamic";

import loadable from '@loadable/component'

type Props = {
  field: {
    blockType: string;
    [model: string]: any; 
  }
}

const DynamicComponent = loadable((props: Props) => import(`./C${props.field.blockType}`));

// const DynamicComponent = (componentName: string) =>
//   dynamic(() => import(`./C${componentName}`));

const CCustomComponent: FC<Props> = ({ field }) => {
  // return React.createElement(DynamicComponent(field?.blockType), {
  //   // @ts-ignore
  //   field: field,
  // });

  return <DynamicComponent field={field}/>
};

export default CCustomComponent;
