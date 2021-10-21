import { Layout } from "layout/Layout";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { EmptyContent } from "components/EmptyContent";
import { LoadingContent } from "components/Loading/LoadingContent";
import { SnippetCard } from "components/SnippetCard";
import { getLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { useApi } from "utils/api/useApi";
import Link from "next/link";
import { useAppContext } from "context";
import { sortTagsWithId, Tag } from "components/Tag";
import { UnderlinedHeading2 } from "components/Text/UnderlinedHeading2";
import { MetaHead } from "components/MetaHead";

export default function SnippetsByTag() {
  const { tags } = useAppContext();
  const router = useRouter();
  const { tag: currentTag } = router.query;

  const [snippetsApi, getSnippet] = useApi(getLatestSnippets);

  const otherTags = useMemo(() => {
    return currentTag && typeof currentTag === "string"
      ? sortTagsWithId(tags).filter(({ tag }) => tag !== currentTag)
      : tags;
  }, [tags, currentTag]);

  const tagTitle = useMemo(() => {
    if (currentTag && typeof currentTag === "string") {
      return currentTag.toUpperCase();
    }
  }, [currentTag]);

  useEffect(() => {
    if (currentTag && typeof currentTag === "string") {
      getSnippet({ search: `tags=${currentTag}` });
    }
  }, [currentTag]);

  return (
    <>
      <MetaHead title={`Tag: ${tagTitle}`} />

      <Layout>
        <Title>
          <UnderlinedHeading2 skew>
            Tag: <span>{tagTitle}</span>
          </UnderlinedHeading2>
        </Title>
        <h4>Search with other tags:</h4>
        <OtherTags>
          {otherTags.map(({ id, tag }) => (
            <li key={`${tag}-${id}`}>
              <Tag text={tag} href={`/snippets/${tag}`} isRouterLink />
            </li>
          ))}
        </OtherTags>
        <TagSnippets>
          <LoadingContent
            isLoading={snippetsApi.status === "loading"}
            marginTop="80px"
          >
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
    </>
  );
}

const OtherTags = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0;

  > li {
    &:not(:last-of-type) {
      margin-right: 8px;
    }
  }
`;

const Title = styled.div`
  margin-bottom: 20px;
  span {
    color: #3e60f9;
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
