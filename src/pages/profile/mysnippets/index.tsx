import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { getMyLatestSnippetsAPI } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";
import { useApi } from "utils/api/useApi";
import { LoadingContent } from "components/Loading/LoadingContent";
import { useAppContext } from "context";
import { EmptyContent } from "components/EmptyContent";

export default function MySnippets() {
  const { isCurrentUser } = useAppContext();
  const [snippetsApi] = useApi(getMyLatestSnippetsAPI, {
    autoCall: true,
  });

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo | My Snippets</title>
      </Head> */}

      <Layout isAllowed={!!isCurrentUser}>
        <Title>My Code Snippets 📝:</Title>
        <MySnippetsList>
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
        </MySnippetsList>
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

  > li {
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
