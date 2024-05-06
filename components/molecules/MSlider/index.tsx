'use client'
import { useKeenSlider } from 'keen-slider/react'
import React, { useState } from 'react'
import "keen-slider/keen-slider.min.css"
import { SliderProps } from '@/interfaces'
import Image from 'next/image'
import styles from './MSlider.module.css';
import clsx from 'clsx'
import ORichText from '@/features/ORichText'
import AButton from '@/components/atoms/AButton'
import Link from 'next/link'

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}


const MSlider = ({ slides, settings }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: settings.loop,
    drag: settings.draggable,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  },
    settings.autoplay ? [
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
          }, settings.autoplaySpeed)
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
    ] : []
  )

  return (
    <>
      <div className={styles["navigation-wrapper"]}>
        <div ref={sliderRef} className="keen-slider max-h-screen">
          {
            slides?.map(({ id, heading, copy, button, attribution, media: {
              cloudinary: { resource_type, original_filename },
              url,
              filename
            }, }) => (
              <div key={id} className={`keen-slider__slide`}>

                <div className='absolute whitespace-normal flex flex-col justify-center z-50 top-0 pl-6 pt-14 pb-12 left-0 h-full lg:w-1/2 w-11/12' >
                  <h3 className='lg:text-h2 md:text-h4 text-h5 font-bold pb-2'>{heading}</h3>

                  {!!copy && <div className='lg:line-clamp-none line-clamp-3 child:inline'><ORichText copy={copy} /></div>}
                  <Link className='py-2 px-4 o-theme-window w-fit mt-5 rounded-full' href={button.url}>{button.text}</Link>
                </div>

                <div dangerouslySetInnerHTML={{ __html: attribution || '' }} className='absolute max-w-36 md:max-w-none z-50 bottom-5 right-5' />


                {resource_type === "video" ? (
                  <div className="o-aspect-ratio o-aspect-ratio--2:1 overflow-hidden min-h-80">
                    <video
                      poster="logowhite.svg"
                      className="lazy o-aspect-ratio__content opacity-50 object-cover mx-auto transition-transform"
                      autoPlay
                      muted
                      loop
                      playsInline
                      src={url}
                    />
                  </div>
                ) : (
                  <div className="o-aspect-ratio o-aspect-ratio--2:1 overflow-hidden min-h-80">
                    <Image
                      fill
                      src={filename}
                      sizes={`(max-width: 1024px) 100vw, 50vw`}
                      className="o-aspect-ratio__content opacity-50 object-cover mx-auto transition-transform"
                      alt={original_filename}
                    />
                  </div>
                )}
              </div>
            ))
          }
        </div>
        {loaded && instanceRef.current && settings.dots && (
          <div className={styles.dots}>
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
        )}

        {loaded && instanceRef.current && settings.arrows && (
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
        )}
      </div>

    </>
  )
}

export default MSlider;