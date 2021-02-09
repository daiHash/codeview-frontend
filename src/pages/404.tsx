import React, { Fragment, useMemo } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import Image from "next/image";
import { ButtonLink } from "components/Button/ButtonLink";
import { generateRandomNumberInRange } from "utils/getRandomNumber";

// TODO: Fix styles
export default function NotFound() {
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
