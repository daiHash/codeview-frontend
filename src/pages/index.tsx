import styled from "@emotion/styled";
import React from "react";
import { Layout } from "layout/Layout";
import { getLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";
import { EmptyContent } from "components/EmptyContent";
import { UnderlinedHeading2 } from "components/Text/UnderlinedHeading2";
import { HeroContent } from "components/Home/HeroContent";
import { useAppContext } from "context";
import { Snippet } from "helpers/api/snippets/types";
import { GetServerSidePropsResult } from "next";
import { MetaHead } from "components/MetaHead";

type Props = {
  snippets: Snippet[] | null;
  status: "successful" | "error";
};

const Home: React.FC<Props> = ({ snippets, status }) => {
  const { isCurrentUser } = useAppContext();

  return (
    <>
      <MetaHead />

      <Layout>
        {isCurrentUser !== undefined ? !isCurrentUser && <HeroContent /> : null}
        <UnderlinedHeading2 skew>Latest Code Snippets:</UnderlinedHeading2>
        <LatestSnippets>
          {status === "successful" ? (
            snippets.length > 0 ? (
              snippets.map((snippet) => (
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
        </LatestSnippets>
      </Layout>
    </>
  );
};

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const { error, data } = await getLatestSnippets();

  if (error) {
    return { props: { snippets: null, status: "error" } };
  }

  return { props: { snippets: data, status: "successful" } };
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

export default Home;
