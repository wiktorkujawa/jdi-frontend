import React, { FC } from 'react'
import dynamic from 'next/dynamic'

interface IconsClasses {
  [key: string]: string;
}

const iconsClasses: IconsClasses = {
  linkedin: 'fill-linkedin',
  github: 'dark:fill-white'
};

const DynamicComponent = (name: string) => dynamic(() => import(`/public/assets/svg/${name}.svg`));

const Asvg:FC<any> = ({ name, className, ...props}) => {
  let Icon = DynamicComponent(name)
  return (
    <Icon {...props} className={`${iconsClasses[name]} ${className}`}/>
  )
}

export default Asvg