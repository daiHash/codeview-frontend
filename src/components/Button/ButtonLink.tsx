import styled from "@emotion/styled";
import React, { Fragment } from "react";
import Link from "next/link";

type Props = {
  href: string;
  isExternal?: boolean;
  isRouterLink?: boolean;
  invert?: boolean;
};

export const ButtonLink: React.FC<Props> = ({
  children,
  href,
  isExternal,
  isRouterLink,
  invert,
}) => {
  return (
    <Fragment>
      {isExternal ? (
        <A
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          invert={invert}
        >
          {children}
        </A>
      ) : isRouterLink ? (
        <Link href={href}>
          <A invert={invert} tabIndex={0}>
            {children}
          </A>
        </Link>
      ) : (
        <A href={href} invert={invert} tabIndex={0}>
          {children}
        </A>
      )}
    </Fragment>
  );
};

const A = styled.a<{ invert?: boolean }>`
  display: inline-block;
  text-align: center;
  background: ${({ invert }) => (invert ? "transparent" : "#4568fb")};
  color: ${({ invert }) => (invert ? "#4568fb" : "#fff")};
  border-radius: 4px;
  width: auto;
  min-width: 120px;
  padding: 10px 15px;
  font-size: 18px;
  border: ${({ invert }) => (invert ? "1px solid #4568fb" : "none")};
  cursor: pointer;
  transition: background 0.2s color 0.2s;

  &:hover {
    background: ${({ invert }) =>
      invert ? "#4568fb" : "rgba(69, 105, 251, 0.9)"};
    color: #fff;
  }
`;
