import { Layout } from "layout/Layout";
import { Head } from "next/document";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { EmptyContent } from "components/EmptyContent";
import { LoadingContent } from "components/Loading/LoadingContent";
import { SnippetCard } from "components/SnippetCard";
import { getLatestSnippetsAPI } from "helpers/api/snippets/getLatestSnippets";
import { useApi } from "utils/api/useApi";
import Link from "next/link";

export default function SnippetsByTag() {
  const router = useRouter();
  const { tag } = router.query;

  const [snippetsApi, getSnippet] = useApi(getLatestSnippetsAPI);

  useEffect(() => {
    if (tag && typeof tag === "string") {
      getSnippet({ search: `tags=${tag}` });
    }
  }, [tag]);

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <Layout>
        <Title>
          Tag: <span>{tag}</span>
        </Title>
        <TagSnippets>
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
        </TagSnippets>
      </Layout>
    </Fragment>
  );
}

const Title = styled.h2`
  span {
    color: #4568fb;
  }
`;

const TagSnippets = styled.ul`
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
