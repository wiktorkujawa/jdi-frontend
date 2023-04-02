import React, { FC } from 'react'
import dynamic from 'next/dynamic'

const DynamicComponent = (name:string) => dynamic(() => import(`/public/assets/svg/github.svg`));
// const DynamicComponent = (name: string) => dynamic(() => import(`/public/assets/svg/${name}.svg`));

const Asvg:FC<any> = ({ name, ...props}) => {
  let Icon = DynamicComponent(name)
  return (
    <Icon {...props}/>
  )
}

export default Asvg