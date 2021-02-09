import React from "react";
import "modern-css-reset";
import "../styles/globals.css";
import { AppWrapper } from "context";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { FocusEffectManager } from "components/Modal/FocusEffectManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <FocusEffectManager />
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
