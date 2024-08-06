'use client';
import { TABLET_WIDTH } from '@/consts';
import useCanvasScroll from '@/hooks/useCanvasScroll';
import { useEffect, useState } from 'react'

const CApp = () => {
  const [startApp, setStartApp] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      window.scrollBy(0, event.deltaY);
    };
    const InitWasm = async () => {
      const Module = (await import("scriptjs")).default;

      Module.get("../assets/index.js", () => {
        console.log("index loaded");
      });
      Module.get("../assets/runIndex.js", () => {
        console.log("run index loaded");
      });
      document
        ?.getElementById('canvas')
        ?.addEventListener("wheel", handleScroll);

    };
    setTimeout(() => setStartApp(true), 1000);
    if (typeof document !== "undefined" && startApp) {
      InitWasm();
    }
    () => {
      document
        ?.getElementById('canvas')
        ?.removeEventListener("wheel", handleScroll);
    };
  }, [startApp]);

  useCanvasScroll('canvas');
  return (
    <div>
      {startApp && (
        <div className="mx-4 overflow-x-auto">
          <canvas
            className={`emscripten min-w-[${TABLET_WIDTH}px]`}
            id="canvas"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      )}
    </div>
  )
}

export default CApp;