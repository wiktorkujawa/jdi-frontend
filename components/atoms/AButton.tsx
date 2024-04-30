import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'
import Asvg from './ASvg';
import Link, { LinkProps} from 'next/link'

interface IButton extends LinkProps, PropsWithChildren {
  iconName?: string;
  width?: number;
  height?: number;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

const AButton:FC<IButton> = ({iconName, onClick, ...props}) => {
  return ( 
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
  )
}

export default AButton