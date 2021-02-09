import React, { useEffect, useState } from "react";
import { Global, css } from "@emotion/react";
/**
 * Component that modifies CSS so outlines are only shown when using keyboards to navigate
 */
export const FocusEffectManager: React.FunctionComponent = () => {
  const [showFocusEffect, setShowFocusEffect] = useState(false);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") {
        setShowFocusEffect(true);
      }
    };
    const clickHandler = () => {
      setShowFocusEffect(false);
    };

    document.addEventListener("keydown", keydownHandler, false);
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("touchstart", clickHandler, false);

    return () => {
      document.removeEventListener("keydown", keydownHandler, false);
      document.removeEventListener("click", clickHandler, false);
      document.removeEventListener("touchstart", clickHandler, false);
    };
  }, []);

  return (
    <Global
      styles={css`
        *:focus {
          outline: ${showFocusEffect ? 1 : 0};
        }
      `}
    />
  );
};
