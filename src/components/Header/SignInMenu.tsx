import React, { Fragment, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import GoogleSignInButtonAsset from "./assets/btn_google_signin.png";
import styled from "@emotion/styled";
import { TextLink } from "../TextLink";
import { useToggle } from "utils/hooks/useToggle";
import { Button } from "../Button";

export const SignInMenu = () => {
  const [isOpen, toggle] = useToggle(false);
  const menuRef = useRef<HTMLElement>(null);

  const GOOGLE_SIGIN_URL = useMemo(
    () =>
      process.env.NODE_ENV !== "development"
        ? "https://codeview.herokuapp.com/api/auth/google"
        : "http://localhost:3000/api/auth/google",
    []
  );

  const onToggle = () => {
    toggle();
  };

  return (
    <Fragment>
      <Button onClick={onToggle}>Sign In</Button>

      {isOpen && (
        <Fragment>
          <MenuBGLayer onClick={onToggle} />
          <MenuContent ref={menuRef}>
            <ul>
              <li>
                <TextLink href={GOOGLE_SIGIN_URL}>
                  <Image
                    src={GoogleSignInButtonAsset}
                    alt="Google Sign In Button"
                    width={180}
                    height={50}
                  />
                </TextLink>
              </li>
            </ul>
          </MenuContent>
        </Fragment>
      )}
    </Fragment>
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

const MenuContent = styled.nav`
  position: absolute;
  top: 80px;
  right: 10px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid rgba(48, 48, 48, 0.2);
  background: #fff;
  z-index: 10;

  ul {
    padding: 0 20px;

    li {
      width: 100%;
      height: 50px;
      line-height: 40px;
    }
  }
`;
