import { ICopy } from '@/interfaces';
import React from 'react'
import CHeadingCopyBlock from './CHeadingCopyBlock';

type Props = {
  arrowScroll?: string;
}

const getBriefData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/brief`, {
    next: {
      tags: ["brief"],
    },
  });
  const data: BriefDataProps = await res.json();
  return data;
};

type BriefDataProps = {
  heading: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5";
  copy: ICopy[];
  blockName?: string;
};

const CBriefData = async ({arrowScroll}: Props) => {
  const briefData = await getBriefData();
  return (
    <CHeadingCopyBlock field={{ ...briefData, arrowScroll }} />
  )
}

export default CBriefData