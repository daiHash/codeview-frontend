import styled from "@emotion/styled";
import React, { Fragment } from "react";
import { useAppContext } from "context";
import { ButtonLink } from "../Button/ButtonLink";
import { LoggedInMenu } from "./LoggedInMenu";
import { TextLink } from "../TextLink";
import { SignInMenu } from "./SignInMenu";
import { useCheckIsPCSize } from "utils/hooks/useCheckIsPCSize";
import Image from "next/image";

export const Header = () => {
  const { isCurrentUser, avatarUrl } = useAppContext();

  return (
    <StyledHeader>
      <div>
        <TextLink href="/" isRouterLink>
          <Image
            src="/codeview-logo.svg"
            alt=""
            width={150}
            height={80}
            aria-hidden
          />
        </TextLink>

        {/* TODO: Maybe handle with loader */}
        {isCurrentUser !== undefined ? (
          isCurrentUser ? (
            <Fragment>
              <ButtonLink href="/snippet/create" isRouterLink>
                Create <span>Snippet</span>
              </ButtonLink>

              <LoggedInMenu avatarUrl={avatarUrl} />
            </Fragment>
          ) : (
            <SignInMenu />
          )
        ) : null}
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  min-width: 320px;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 3px 3px rgba(48, 48, 48, 0.25);

  > div {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;

    > a {
      &:first-of-type {
        display: inline-flex;
        align-items: center;
        height: 100%;
        margin-right: auto;
      }
    }

    @media screen and (max-width: 600px) {
      padding: 0 10px;

      > a {
        &:first-of-type + a {
          min-width: 100px;
        }

        span {
          display: none;
        }

        > div {
          img {
            min-width: 80% !important;
            margin: 0 !important;
          }
        }
      }
    }
  }
`;
