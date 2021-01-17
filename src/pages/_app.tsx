import React from "react";
import "sanitize.css";
import "../styles/globals.css";
import { AppWrapper } from "context";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
