"use client";

import { useEffect } from "react";
import { get } from "scriptjs";
const App = () => {
  const initWasm = () => {
    get("assets/wasm/index.js", () => {
      console.log("index loaded");
    });
    get("assets/wasm/runIndex.js", () => {
      console.log("run index loaded");
    });
  };

  useEffect(() => {
    initWasm();
  }, []);

  return (
    <main>
      <canvas
        className="emscripten"
        id="canvas"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      ></canvas>
    </main>
  );
};

export default App;
