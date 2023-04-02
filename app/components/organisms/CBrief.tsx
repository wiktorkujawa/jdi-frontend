import React from 'react'
import CHeadingCopyBlock from './CHeadingCopyBlock';

type Props = {}



const getData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/brief`);
  const data: any = await res.json();
  return data
}

const CBrief = async () => {

  const data = await getData();
  return (
    <CHeadingCopyBlock field={data}/>
  )
}

export default CBrief