import { useEffect } from "react";

const useCanvasScroll = (id='the_canvas_id') => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      window.scrollBy(0, event.deltaY);
    };

    if (typeof document !== "undefined") {
      document
        ?.getElementById(id)
        ?.addEventListener("wheel", handleScroll);
    }

    () => {
      document
        ?.getElementById(id)
        ?.removeEventListener("wheel", handleScroll);
    };
  }, [id]);
};

export default useCanvasScroll;
