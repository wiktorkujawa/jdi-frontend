"use client";
import { useEffect, useState } from "react";

const App = () => {

  const [startApp, setStartApp] = useState(false);

  useEffect(() => {

    const InitWasm = async () => {
      const Module = (await import('scriptjs')).default;

      Module.get("assets/wasm/index.js", () => {
        console.log("index loaded");
      });
      Module.get("assets/wasm/runIndex.js", () => {
        console.log("run index loaded");
      });
    }
    setTimeout(() => setStartApp(true), 1000);
    if (typeof document !== 'undefined' && startApp) {

      InitWasm();

      
    }
  }, [startApp]);

  return (
    <main>
      { startApp && <canvas
        className="emscripten"
        id="canvas"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      ></canvas>}
    </main>
  );
};

export default App;
