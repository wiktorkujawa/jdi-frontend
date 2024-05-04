import { useKeenSlider } from 'keen-slider/react'
import React, { useState } from 'react'
import "./styles.css"
import "keen-slider/keen-slider.min.css"

type Props = {
    slides: Slide[]
}

type Slide = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}


const Slider = ({ slides }: Props) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ])
  
    return (
      <>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {
                !!slides.length && slides?.map((slide) => (
                    <div key={slide.id} className={`keen-slider__slide number-slide1`}>
                        <img style={{ objectFit: 'cover'}} src={slide.url} alt={slide.title} />
                    </div>
                ))
            }
          </div>
          {/* {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
  
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )} */}
  
  {loaded && instanceRef.current && !!slides.length && (
          <div className="dots">
            {slides.map((_,idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              )
            })}
          </div>
        )}
        </div>
        
      </>
    )
  }

export default Slider;


// function Arrow(props: {
//     disabled: boolean
//     left?: boolean
//     onClick: (e: any) => void
//   }) {
//     const disabled = props.disabled ? " arrow--disabled" : ""
//     return (
//       <svg
//         onClick={props.onClick}
//         className={`arrow ${
//           props.left ? "arrow--left" : "arrow--right"
//         } ${disabled}`}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//       >
//         {props.left && (
//           <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
//         )}
//         {!props.left && (
//           <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
//         )}
//       </svg>
//     )
//   }