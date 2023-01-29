import React, { useState, useEffect } from "react";
const useViewport =
  typeof window !== "undefined"
    ? () => {
        const [width, setWidth] = useState(window.innerWidth);
        const [height, setHeight] = useState(window.innerHeight);
        useEffect(() => {
          const handleWindowResize = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
          };
          window.addEventListener("resize", handleWindowResize);
          return () => window.removeEventListener("resize", handleWindowResize);
        }, []);
        return { height, width };
      }
    : () => ({ height: 1920, width: 1080 });
export default useViewport;
