import  { useEffect, useState } from "react";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    function handleResize() {
      if (isMounted) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial window size update
    handleResize();

    // Cleanup function to remove the event listener
    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return windowSize;
}
/*
export interface Size {
    width: number | undefined;
    height: number | undefined;
}

export function  useWindowSize():Size {
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
      function updateWindowSize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
      }
      window.addEventListener("resize", updateWindowSize);
      updateWindowSize();
      
      return () => window.removeEventListener("resize", updateWindowSize);
    }, []);
    return windowSize;
  }

*/