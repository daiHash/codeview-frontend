import React from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { getMyLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";
import { useApi } from "utils/api/useApi";
import { LoadingContent } from "components/Loading/LoadingContent";
import { useAppContext } from "context";
import { EmptyContent } from "components/EmptyContent";
import { UnderlinedHeading } from "components/Text/UnderlinedHeading";
import { MetaHead } from "components/MetaHead";

export default function MySnippets() {
  const { isCurrentUser } = useAppContext();
  const [snippetsApi] = useApi(getMyLatestSnippets, {
    autoCall: true,
  });

  return (
    <>
      <MetaHead title="My Code Snippets 📝" />

      <Layout isAllowed={!!isCurrentUser}>
        <UnderlinedHeading skew>My Code Snippets 📝:</UnderlinedHeading>
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
    </>
  );
}

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

    @media screen and (max-width: 768px) {
      width: 100%;

      &:nth-of-type(odd) {
        margin-right: 0;
      }
    }
  }
`;
