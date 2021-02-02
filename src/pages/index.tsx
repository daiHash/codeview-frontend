import Head from "next/head";
import styled from "@emotion/styled";
import { useAppContext } from "context";
import { api } from "utils/api";
import React, { Fragment, useEffect, useState } from "react";
import { Layout } from "layout/Layout";
import { getLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import { Snippet } from "helpers/api/snippets/types";
import Link from "next/link";

export default function Home() {
  // const { isCurrentUser } = useAppContext();

  const [snippets, setSnippets] = useState<Snippet[]>([]);
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
    const res = await api.put("/snippets/1", {
      title: "New Snippeto",
      snippetContentMD: ["## NewSnippet1", "#### more"],
    });

    if (res) {
      return res.data;
    }
  };

  useEffect(() => {
    (async () => {
      const snippets = await getLatestSnippets();

      setSnippets(snippets);
    })();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Code Snippet Memo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Title>Latest Code Snippets:</Title>
        <LatestSnippets>
          {snippets.map((snippet) => (
            <li key={`${snippet.id}`}>
              <Link href={`/snippet/${snippet.id}`}>
                <a>
                  <SnippetCard snippet={snippet} />
                </a>
              </Link>
            </li>
          ))}
        </LatestSnippets>
      </Layout>
    </Fragment>
  );
}

const Title = styled.h2``;

const LatestSnippets = styled.ul`
  padding-left: 0;

  li {
    &:not(:first-of-type) {
      margin-top: 25px;
    }
  }
`;
