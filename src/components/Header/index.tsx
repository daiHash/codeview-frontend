import styled from "@emotion/styled";
import React, { Fragment } from "react";
import { useAppContext } from "context";
import { ButtonLink } from "../Button/ButtonLink";
import { HamburgerMenu } from "./HamburgerMenu";
import { TextLink } from "../TextLink";
import { SignInMenu } from "./SignInMenu";
import { useCheckIsPCSize } from "utils/hooks/useCheckIsPCSize";

export const Header = () => {
  const { isCurrentUser } = useAppContext();
  const isPCSize = useCheckIsPCSize();

  return (
    <StyledHeader>
      <TextLink href="/" isRouterLink>
        <h2>{isPCSize ? "Code Snippet Memo" : "CSM📝"}</h2>
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
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 375px;
  height: 80px;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(48, 48, 48, 0.25);

  > a {
    &:first-of-type {
      display: inline-flex;
      align-items: center;
      height: 100%;
      margin-right: auto;
    }
  }
`;
