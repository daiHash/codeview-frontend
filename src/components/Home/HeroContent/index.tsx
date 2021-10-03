import styled from "@emotion/styled";
import React, { useMemo } from "react";
import HeroImage from "./assets/hero-image.svg";
import { Heading2 } from "components/Text/Heading2";
import { UnderlinedText } from "components/Text/UnderLinedText";
import { ButtonLink } from "components/Button/ButtonLink";

export const HeroContent = () => {
  const GOOGLE_SIGIN_URL = useMemo(
    () =>
      process.env.NODE_ENV !== "development"
        ? "https://codeview.herokuapp.com/api/auth/google"
        : "http://localhost:3000/api/auth/google",
    []
  );

  return (
    <Wrapper>
      <HeroContentText>
        <div>
          <Heading2 lineHeight="40px" fontSize="42px" skew>
            <UnderlinedText underlineColor={{ plain: "#F9D63E" }}>
              CodeView
            </UnderlinedText>
          </Heading2>

          <p>add, share, discover code snippets with others</p>
        </div>

        <div>
          <ButtonLink href={GOOGLE_SIGIN_URL}>Sign In</ButtonLink>
        </div>
      </HeroContentText>

      <HeroImageWrapper>
        <HeroImage />
      </HeroImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto 60px;

  > div {
    width: 50%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const HeroContentText = styled.div`
  > div {
    &:first-of-type {
      > p {
        margin-top: 20px;
      }
    }

    &:last-of-type {
      margin-top: 20px;
    }
  }
`;

const HeroImageWrapper = styled.div`
  > svg {
    width: 100%;
    height: auto;
  }
`;