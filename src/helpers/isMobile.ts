import { useState, useEffect } from "react";

export default function useIsMobile() {
  const [windowSize, setWindowSize] = useState([
    typeof window !== "undefined" ? window.innerWidth : 0,
    typeof window !== "undefined" ? window.innerHeight : 0,
  ]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowResize);
      }
    };
  }, []);

  useEffect(() => {
    if (windowSize[0]) {
      if (windowSize[0] < 869) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [windowSize]);

  return { isMobile };
}
