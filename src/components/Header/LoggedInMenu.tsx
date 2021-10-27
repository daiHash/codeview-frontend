import styled from "@emotion/styled";
import React from "react";
import { TextLink } from "../TextLink";
import { useToggle } from "utils/hooks/useToggle";

export const LoggedInMenu: React.FC<{ avatarUrl: string }> = ({
  avatarUrl,
}) => {
  const [isOpen, toggle] = useToggle(false);

  const onToggle = () => {
    toggle();
  };

  return (
    <>
      <MenuButton
        aria-controls="global-nav"
        aria-haspopup="true"
        id="menu-button"
        // onClick={onToggle}
        onClick={onToggle}
        // onMouseEnter={() => toggle(true)}
        // onMouseLeave={() => toggle(false)}
      >
        <img src={avatarUrl} alt="" width={45} height={45} aria-hidden />
        <span />
      </MenuButton>

      {isOpen && (
        <>
          <MenuBGLayer onClick={onToggle} />
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
                <TextLink href="/profile/favorites" isRouterLink>
                  Favorite Snippets
                </TextLink>
              </li>
              <li>
                <TextLink href="/profile/mysnippets" isRouterLink>
                  My Snippets
                </TextLink>
              </li>
              <li>
                <TextLink href={process.env.NEXT_PUBLIC_LOGOUT_URL}>
                  Log out
                </TextLink>
              </li>
            </ul>
          </MenuContent>
        </>
      )}
    </>
  );
};

const MenuBGLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 5;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;

  img {
    border-radius: 50%;
    border: 1px solid #e0e0e0;
  }

  span {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 5px;
    vertical-align: middle;
    content: "";
    border-top-style: solid;
    border-top-width: 4px;
    border-right: 4px solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 4px solid transparent;
  }

  @media screen and (max-width: 600px) {
    margin-left: 5px;
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
