import styled from "@emotion/styled";
import React, { Fragment } from "react";
import Link from "next/link";

type Props = {
  href: string;
  isExternal?: boolean;
  isRouterLink?: boolean;
  invert?: boolean;
  disabled?: boolean;
};

export const ButtonLink: React.FC<Props> = ({
  children,
  href,
  isExternal,
  isRouterLink,
  invert,
  disabled,
}) => {
  return (
    <Fragment>
      {isExternal ? (
        <A
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          invert={invert}
          disabled={disabled}
        >
          {children}
        </A>
      ) : isRouterLink ? (
        <Link href={href} passHref>
          <A invert={invert} tabIndex={0} disabled={disabled}>
            {children}
          </A>
        </Link>
      ) : (
        <A href={href} invert={invert} tabIndex={0} disabled={disabled}>
          {children}
        </A>
      )}
    </Fragment>
  );
};

const A = styled.a<{ invert?: boolean; disabled?: boolean }>`
  display: inline-block;
  text-align: center;
  background: ${({ invert }) => (invert ? "transparent" : "#3E60F9")};
  color: ${({ invert }) => (invert ? "#3E60F9" : "#fff")};
  border-radius: 4px;
  width: auto;
  min-width: 120px;
  padding: 10px 15px;
  font-size: 1rem;
  border: ${({ invert }) => (invert ? "1px solid #3E60F9" : "none")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s color 0.2s;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  &:hover {
    background: ${({ invert }) =>
      invert ? "#3E60F9" : "rgba(69, 105, 251, 0.9)"};
    color: #fff;
  }

  @media screen and (max-width: 600px) {
    font-size: var(--fontSize-15);
  }
`;
