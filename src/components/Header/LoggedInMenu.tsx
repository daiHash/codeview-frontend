import styled from "@emotion/styled";
import React, { Fragment, useMemo } from "react";
// import HamburgerIconAsset from "./assets/Hamburger-Icon.svg";
// import Image from "next/image";
import { TextLink } from "../TextLink";
import { useToggle } from "utils/hooks/useToggle";

export const LoggedInMenu: React.FC<{ avatarUrl: string }> = ({
  avatarUrl,
}) => {
  const [isOpen, toggle] = useToggle(false);

  // TODO: set env vars for this
  const LOGOUT_URL = useMemo(
    () =>
      process.env.NODE_ENV !== "development"
        ? "https://code-snippet-memo.herokuapp.com/api/auth/logout"
        : "http://localhost:3000/api/auth/logout",
    []
  );

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    if (!e.currentTarget) {
      console.log("wtf");
    }
  };

  return (
    <Fragment>
      <MenuButton
        aria-controls="global-nav"
        aria-haspopup="true"
        id="menu-button"
        // onClick={onToggle}
        onClick={toggle}
        // onMouseEnter={() => toggle(true)}
        // onMouseLeave={() => toggle(false)}
      >
        <img src={avatarUrl} alt="" width={50} height={50} aria-hidden />
        {/* <Image
          src={HamburgerIconAsset}
          alt=""
          width={20}
          height={15}
          aria-hidden
        />
        <span>MENU</span> */}
      </MenuButton>

      {isOpen && (
        <MenuContent
          id="global-nav"
          aria-label="Main navigation"
          // onMouseEnter={() => toggle(true)}
        >
          <ul>
            <li>
              <TextLink href="/profile" isRouterLink>
                Profile
              </TextLink>
            </li>
            <li>
              <TextLink href="/snippet/favorites" isRouterLink>
                Favorite Snippets
              </TextLink>
            </li>
            <li>
              <TextLink href="/profile/mysnippets" isRouterLink>
                My Snippets
              </TextLink>
            </li>
            <li>
              <TextLink href={LOGOUT_URL}>Log out</TextLink>
            </li>
          </ul>
        </MenuContent>
      )}
    </Fragment>
  );
};

const MenuButton = styled.button`
  margin-left: 40px;
  cursor: pointer;

  img {
    border-radius: 50%;
    border: 1px solid #e0e0e0;
  }

  span {
    display: block;
    font-size: var(--fontSize-14);
  }

  @media screen and (max-width: 600px) {
    margin-left: 15px;
  }
`;

const MenuContent = styled.nav`
  position: absolute;
  z-index: 10;
  top: 80px;
  right: 10px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid rgba(48, 48, 48, 0.2);

  ul {
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      transition: background 0.2s;

      &:last-of-type {
        margin-top: 10px;
        &::before {
          display: block;
          content: "";
          width: 80%;
          height: 1px;
          margin: 0 auto;
          background: rgba(48, 48, 48, 0.15);
        }
      }

      &:hover {
        background: rgba(48, 48, 48, 0.15);
      }

      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
      }
    }
  }
`;
