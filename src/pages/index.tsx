import Head from "next/head";
import styles from "../styles/Home.module.css";
import { css } from "@emotion/react";

const hello = css`
  color: #222;
`;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Code Snippet Memo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={hello}>Code Snippet Memo</h1>
      </main>
    </div>
  );
}
