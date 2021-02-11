import React from "react";
import "modern-css-reset";
import "../styles/globals.css";
import { AppWrapper } from "context";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { FocusEffectManager } from "components/Modal/FocusEffectManager";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <AppWrapper>
        <FocusEffectManager />
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}

export default MyApp;
