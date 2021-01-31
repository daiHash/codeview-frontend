import Head from "next/head";
import styled from "@emotion/styled";
import { useAppContext } from "context";
import { api } from "utils/api";
import React, { useState } from "react";
import { Layout } from "layout/Layout";
import axios from "axios";
import { NextPageContext } from "next";

export default function Home() {
  // const { isCurrentUser } = useAppContext();

  const [snippets, setSnippets] = useState([]);
  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
    snippetContentMD: [],
  });

  const click = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.post("/snippets", {
      title: "Snippet1",
      description: "this is the first snippet",
      snippetContentMD: ["##Snippet1", "####more"],
    });

    if (res) {
      return res.data;
    }
  };

  const click2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.get("/snippets");

    if (res) {
      setSnippets(res.data);
      return res.data;
    }
  };

  const click3 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.get("/snippets/1");

    if (res) {
      setSnippet(res.data);
      return res.data;
    }
  };

  const click4 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.delete("/snippets/1");

    if (res) {
      return res.data;
    }
  };

  const click5 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.patch("/snippets/1", {
      title: "New Snippeto",
      snippetContentMD: ["## NewSnippet1", "#### more"],
    });

    if (res) {
      return res.data;
    }
  };
  return (
    <Container>
      <Head>
        <title>Code Snippet Memo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <div>
            <button onClick={click}>Create Snippet</button>
            <button onClick={click2}>Get all Snippets</button>
            <button onClick={click3}>Get Snippet by ID</button>
            <button onClick={click4}>Delete Snippet by ID</button>
            <button onClick={click5}>Update Snippet by ID</button>
            <div>
              {snippets.map((snippet) => (
                <p>{snippet.title}</p>
              ))}
            </div>
            <div>{snippet.title}</div>
          </div>
          {/* <h1 css={hello}>
          Code Snippet Memo{" "}
          {isCurrentUser ? (
            <div>
              <a href="http://localhost:3000/api/auth/logout">logout</a>
              <button onClick={click}>Create Snippet</button>
              <button onClick={click2}>Get all Snippets</button>
              <button onClick={click3}>Get Snippet by ID</button>
              <button onClick={click4}>Delete Snippet by ID</button>
              <button onClick={click5}>Update Snippet by ID</button>
              <div>
                {snippets.map((snippet) => (
                  <p>{snippet.title}</p>
                ))}
              </div>
              <div>{snippet.title}</div>
            </div>
          ) : (
            <a href="http://localhost:3000/api/auth/google">
              login with google
            </a>
          )}
        </h1> */}
        </main>
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  /* min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

// Home.getInitialProps = async (context: NextPageContext) => {
//   // if (context.req) {
//   //   // it runs on server side
//   console.log(context.req.headers.cookie);
//   axios.defaults.headers.get.Cookie = context.req.headers.cookie;
//   // }
//   // return { context };
//   return {};
// };
