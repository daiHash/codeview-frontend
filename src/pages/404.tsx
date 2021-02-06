import React, { Fragment, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { Snippet } from "helpers/api/snippets/types";
import Image from "next/image";
import { getMyLatestSnippets } from "helpers/api/snippets/getLatestSnippets";
import { SnippetCard } from "components/SnippetCard";
import Link from "next/link";
import { ButtonLink } from "components/Button/ButtonLink";
import { generateRandomNumberInRange } from "utils/getRandomNumber";

// TODO: Fix styles
export default function MySnippets() {
  const NotFoundGIF = useMemo(() => {
    const gifs = ["/404-1.gif", "/404-2.gif", "/404-3.gif"];
    return gifs[generateRandomNumberInRange(0, gifs.length)];
  }, []);

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo | Snippet Memo</title>
      </Head> */}

      <Layout>
        <Title>
          Oops!
          <br /> Page Not Found
        </Title>
        <Content>
          <Image
            src={NotFoundGIF}
            alt="404 Page Not Found"
            width={640}
            height={400}
          />
          <div>
            <ButtonLink href="/" isRouterLink>
              Go To Top Page
            </ButtonLink>
          </div>
        </Content>
      </Layout>
    </Fragment>
  );
}

const Title = styled.h2`
  font-size: 32px;

  br {
    display: none;
    @media screen and (max-width: 600px) {
      display: block;
    }
  }
`;

const Content = styled.section`
  text-align: center;

  > div {
    margin-top: 20px;
  }
`;
