import styled from "@emotion/styled";
import React, { Fragment } from "react";
import { useAppContext } from "context";
import { ButtonLink } from "../Button/ButtonLink";
import { HamburgerMenu } from "./HamburgerMenu";
import { TextLink } from "../TextLink";
import { SignInMenu } from "./SignInMenu";

export const Header = () => {
  const { isCurrentUser } = useAppContext();

  return (
    <StyledHeader>
      <TextLink href="/" isRouterLink>
        <h2>Code Snippet Memo</h2>
      </TextLink>

      {isCurrentUser && isCurrentUser !== undefined ? (
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
