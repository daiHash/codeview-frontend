import React from "react";
import "modern-css-reset";
import "../styles/globals.css";
import { AppWrapper } from "context";
import { FocusEffectManager } from "components/Modal/FocusEffectManager";
import { AppProps } from "next/dist/shared/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <FocusEffectManager />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
