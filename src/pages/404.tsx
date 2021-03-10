import React, { Fragment, useMemo } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import Image from "next/image";
import { ButtonLink } from "components/Button/ButtonLink";
import { generateRandomNumberInRange } from "utils/getRandomNumber";
import Head from "next/head";

export default function NotFound() {
  const NotFoundGIF = useMemo(() => {
    const gifs = ["/404-1.gif", "/404-2.gif", "/404-3.gif"];
    return gifs[generateRandomNumberInRange(0, gifs.length)];
  }, []);

  return (
    <Fragment>
      <Head>
        <title>CodeView | Page Not Found 🙅‍♂️</title>
      </Head>

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
  text-align: center;
  font-size: var(--fontSize-32);
  margin-bottom: 20px;

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
