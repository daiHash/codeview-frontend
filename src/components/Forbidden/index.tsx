import styled from "@emotion/styled";
import React, { Fragment } from "react";
import Image from "next/image";
import { ButtonLink } from "components/Button/ButtonLink";

export const Forbidden = () => (
  <Fragment>
    <Title>Sorry. You're not permitted to see this</Title>
    <Content>
      <Image
        src="/forbidden.gif"
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
  </Fragment>
);

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
