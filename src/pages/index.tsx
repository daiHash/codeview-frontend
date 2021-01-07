import Head from "next/head";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const hello = css`
  color: #222;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Code Snippet Memo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={hello}>Code Snippet Memo</h1>
      </main>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
