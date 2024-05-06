import { SlidesProps } from "@/interfaces"
import clsx from "clsx"
import styles from '../MSlider.module.css';


const Dots = ({
  slides,
  currentSlide,
  instanceRef
}: {
  slides: SlidesProps[]
  currentSlide: number
  instanceRef: any
}) => {
  return <div className={styles.dots}>
    {slides.map((_, idx) => {
      return (
        <button
          key={idx}
          aria-label={`Slide ${idx + 1}`}
          onClick={() => {
            instanceRef.current?.moveToIdx(idx)
          }}
          className={clsx(styles.dot, currentSlide === idx && styles.active)}
        ></button>
      )
    })}
  </div>
}
export default Dots;
