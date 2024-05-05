import { useEffect, useState } from "react";

const TOP_OFFSET = 30;
const useScrollDetect = () => {
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    if (window.scrollY >= TOP_OFFSET) {
      setScrolling(true);
    }
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setScrolling(true);
      }
      else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolling;
};

export default useScrollDetect;
