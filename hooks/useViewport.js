import React from "react";
const useViewport =
  typeof window !== "undefined"
    ? () => {
        const [width, setWidth] = React.useState(window.innerWidth);
        const [height, setHeight] = React.useState(window.innerHeight);
        React.useEffect(() => {
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
