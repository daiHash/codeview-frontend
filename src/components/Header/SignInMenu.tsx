import React, { Fragment, useMemo } from "react";
import { ButtonLink } from "../Button/ButtonLink";
import Image from "next/image";
import GoogleSignInButtonAsset from "./assets/btn_google_signin.png";
import styled from "@emotion/styled";
import { TextLink } from "../TextLink";
import { useToggle } from "utils/hooks/useToggle";
import { Button } from "../Button";

export const SignInMenu = () => {
  const [isOpen, toggle] = useToggle(false);

  const GOOGLE_SIGIN_URL = useMemo(
    () =>
      process.env.NODE_ENV !== "development"
        ? "https://codeview.herokuapp.com/api/auth/google"
        : "http://localhost:3000/api/auth/google",
    []
  );

  return (
    <Fragment>
      <Button onClick={toggle}>Sign In</Button>

      {isOpen && (
        <MenuContent>
          <ul>
            <li>
              <TextLink href={GOOGLE_SIGIN_URL}>
                <Image
                  src={GoogleSignInButtonAsset}
                  alt="Google Sign In Button"
                  width={191}
                  height={46}
                />
              </TextLink>
            </li>
          </ul>
        </MenuContent>
      )}
    </Fragment>
  );
};

const MenuContent = styled.nav`
  position: absolute;
  top: 80px;
  right: 10px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid rgba(48, 48, 48, 0.2);

  ul {
    padding: 0 20px;

    li {
      width: 100%;
      height: 50px;
      line-height: 40px;
    }
  }
`;
