import { FC } from 'react'
import Asvg from './ASvg';
import Link from 'next/link'

interface IButton extends Partial<HTMLAnchorElement> {
  iconName?: string;
  passHref?: boolean;
  onClick?: () => void;
  width?: number;
  height?: number;
}

const AButton:FC<any> = ({iconName, onClick, ...props}) => {
  return ( 
    // props.href ?
    <Link href={props.href} passHref={props.passHref} onClick={onClick} className={`flex cursor-pointer px-4 py-2 hover:text-red-hover o-theme-window border rounded my-4 w-fit mx-auto ${props.className || ''}`} target={props.target}>
        <>
        {
          iconName ?
          <Asvg width={props.width || 24} height={props.height || 24} name={iconName} />
          : null
        }
        { props.children }
        </>
    </Link>
    // :
    // <a onClick={onClick} className={`${props.className || ''} flex cursor-pointer`} target={props.target}>
    //   <>
    //   {
    //     iconName ?
    //     <Asvg width={props.width || 24} height={props.height || 24} name={iconName} />
    //     : null
    //   }
    //   { props.children }
    //   </>
    // </a>
  )
}

export default AButton