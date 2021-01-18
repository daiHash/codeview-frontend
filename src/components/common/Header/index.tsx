import styled from "@emotion/styled";
import React, { Fragment, useRef } from "react";
import Image from "next/image";
import LogoAsset from "./assets/Logo.svg";
import { useAppContext } from "context";
import { ButtonLink } from "../Button/ButtonLink";
import { HamburgerMenu } from "./HamburgerMenu";
import { TextLink } from "../TextLink";
import { SignInMenu } from "./SignInMenu";

export const Header = () => {
  const { isCurrentUser } = useAppContext();

  if (isCurrentUser === undefined) {
    return null;
  }

  return (
    <StyledHeader>
      <TextLink href="/" isRouterLink>
        <Image
          tabIndex={1}
          src={LogoAsset}
          alt="Code Snippet Memo"
          width={234.4}
          height={26.57}
        />
      </TextLink>

      {isCurrentUser ? (
        <Fragment>
          <ButtonLink href="/snippet/create" isRouterLink>
            Create New Snippet
          </ButtonLink>
          <HamburgerMenu />
        </Fragment>
      ) : (
        <SignInMenu />
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(48, 48, 48, 0.25);

  > a {
    &:first-of-type {
      display: inline-flex;
      height: 100%;
      margin-right: auto;
    }
  }
`;
