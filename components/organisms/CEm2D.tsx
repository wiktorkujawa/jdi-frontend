'use client';

import useCanvasScroll from "@/hooks/useCanvasScroll";
import { useEffect } from "react";
import init from "@/public/wasm/em-2d/web/eframe_template";

const CEm2D = () => {
  useEffect(() => {
    init().catch((error) => {
      if (!error.message.startsWith("Using exceptions for control flow,")) {
        throw error;
      }
    });

  }, []);

  useCanvasScroll();
  return (
    <><div className="relative h-screen o-container o-container--2xl my-16">
      <canvas
        className="absolute left-1/2 -translate-x-1/2 top-0 max-w-wasm-app h-full"
        id="the_canvas_id" />
    </div><div /></>
  )
}

export default CEm2D