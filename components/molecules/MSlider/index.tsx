'use client';
import { useKeenSlider } from 'keen-slider/react';
import React, { useState } from 'react';
import "keen-slider/keen-slider.min.css";
import { SliderProps } from '@/interfaces';
import Image from 'next/image';
import styles from './MSlider.module.css';
import ORichText from '@/features/ORichText';
import Link from 'next/link';
import useRWD from '@/hooks/useRWD';
import dynamic from 'next/dynamic';
import { TABLET_WIDTH } from '@/consts';

const Dots = dynamic(() => import('./partials/Dots'));
// const Arrows = dynamic(() => import('./partials/Arrows'));

const MSlider = ({ slides, settings: { mobile, desktop } }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false);
  const { isDesktop } = useRWD();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: mobile.loop,
    drag: mobile.draggable,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      [`(min-width: ${TABLET_WIDTH}px)`]: {
        loop: desktop.loop,
        drag: desktop.draggable,
      }
    }
  },
    ((mobile.autoplay && !isDesktop) || (desktop.autoplay && isDesktop)) ? [
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
          }, isDesktop ? desktop.autoplaySpeed : mobile.autoplaySpeed)
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
    ] : [],
  );

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
                      sizes={`(max-width: ${TABLET_WIDTH}px) 100vw, 50vw`}
                      className="o-aspect-ratio__content opacity-50 object-cover mx-auto transition-transform"
                      alt={original_filename}
                    />
                  </div>
                )}
              </div>
            ))
          }
        </div>

        {
          loaded && instanceRef.current && (
            <>
              {isDesktop ? (
                <>
                  {desktop.dots && <Dots slides={slides} currentSlide={currentSlide} instanceRef={instanceRef} />}
                  {/* {desktop.arrows && <Arrows currentSlide={currentSlide} instanceRef={instanceRef} />} */}
                </>

              ) : (
                <>
                  {mobile.dots && <Dots slides={slides} currentSlide={currentSlide} instanceRef={instanceRef} />}
                  {/* {mobile.arrows && <Arrows currentSlide={currentSlide} instanceRef={instanceRef} />} */}
                </>
              )
              }

            </>
          )
        }
      </div>

    </>
  )
};

export default MSlider;

