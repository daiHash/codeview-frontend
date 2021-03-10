import Head from "next/head";
import styled from "@emotion/styled";
import React, { Fragment } from "react";
import { Layout } from "layout/Layout";
import { getLatestSnippetsAPI } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";
import { useApi } from "utils/api/useApi";
import { LoadingContent } from "components/Loading/LoadingContent";
import { EmptyContent } from "components/EmptyContent";
import { Heading2 } from "components/Text/Heading2";

export default function Home() {
  const [snippetsApi] = useApi(getLatestSnippetsAPI, {
    autoCall: true,
  });

  return (
    <Fragment>
      <Head>
        <title>CodeView</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Heading2>Latest Code Snippets:</Heading2>
        <LatestSnippets>
          <LoadingContent isLoading={snippetsApi.status === "loading"}>
            {snippetsApi.status === "succeeded" ? (
              snippetsApi.response.length > 0 ? (
                snippetsApi.response.map((snippet) => (
                  <li key={`${snippet.id}`}>
                    <Link href={`/snippet/${snippet.id}`}>
                      <a>
                        <SnippetCard snippet={snippet} />
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <EmptyContent />
              )
            ) : null}
          </LoadingContent>
        </LatestSnippets>
      </Layout>
    </Fragment>
  );
}

const LatestSnippets = styled.ul`
  width: 100%;
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  > li {
    width: calc((100% - 40px) / 2);
    margin-top: 25px;

    &:nth-of-type(odd) {
      margin-right: 20px;
    }

    @media screen and (max-width: 768px) {
      width: 100%;

      &:nth-of-type(odd) {
        margin-right: 0;
      }
    }
  }
`;
