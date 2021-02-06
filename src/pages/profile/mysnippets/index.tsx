import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { Snippet } from "helpers/api/snippets/types";
import { getMyLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";

// TODO: Fix styles
export default function MySnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    (async () => {
      const snippets = await getMyLatestSnippets();

      setSnippets(snippets);
    })();
  }, []);

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo | Snippet Memo</title>
      </Head> */}

      <Layout>
        <Title>My Code Snippets 📝:</Title>
        <MySnippetsList>
          {snippets.map((snippet) => (
            <li key={`${snippet.id}`}>
              <Link href={`/snippet/${snippet.id}`}>
                <a>
                  <SnippetCard snippet={snippet} />
                </a>
              </Link>
            </li>
          ))}
        </MySnippetsList>{" "}
      </Layout>
    </Fragment>
  );
}

const Title = styled.h2``;

const MySnippetsList = styled.ul`
  width: 100%;
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  li {
    width: calc((100% - 40px) / 2);
    margin-top: 25px;

    &:nth-of-type(odd) {
      margin-right: 20px;
    }

    @media screen and (max-width: 600px) {
      width: 100%;

      &:nth-of-type(odd) {
        margin-right: 0;
      }
    }
  }
`;
