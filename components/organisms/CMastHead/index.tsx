import MSlider from '@/components/molecules/MSlider'
import { SliderProps } from '@/interfaces'
import React from 'react'

type Props = {
  field: {
    slider: SliderProps
  }
}

const CMasthead = ({ field: { slider: {
  settings,
  slides
} } }: Props) => {
  return (
    <section className="c-masthead">
      {settings && slides && <MSlider settings={settings} slides={slides} />}
    </section>
  )
}

export default CMasthead;