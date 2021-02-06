import { useEffect, useState } from "react";

export const useCheckIsPCSize = () => {
  const [isPCSize, setIsPCSize] = useState<boolean>(undefined);

  useEffect(() => {
    if (window !== undefined) {
      setIsPCSize(window.innerWidth >= 600);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const checkWindowSize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsPCSize(false);
        return;
      }
      setIsPCSize(true);
    };

    mediaQuery.addEventListener("change", checkWindowSize);

    return () => mediaQuery.removeEventListener("change", checkWindowSize);
  }, []);

  return isPCSize;
};
