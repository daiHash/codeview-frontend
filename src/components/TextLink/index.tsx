import styled from "@emotion/styled";
import React, { Fragment } from "react";
import Link from "next/link";

type Props = {
  color?: string;
  fontSize?: string;
  href: string;
  isRouterLink?: boolean;
  onClick?: () => void;
};

export const TextLink: React.FC<Props> = ({
  children,
  href,
  color,
  fontSize,
  isRouterLink,
  onClick,
}) => {
  return (
    <Fragment>
      {isRouterLink ? (
        <Link href={href}>
          <A color={color} fontSize={fontSize} onClick={onClick} tabIndex={0}>
            {children}
          </A>
        </Link>
      ) : (
        <A
          href={href}
          color={color}
          fontSize={fontSize}
          onClick={onClick}
          tabIndex={0}
        >
          {children}
        </A>
      )}
    </Fragment>
  );
};

const A = styled.a<Omit<Props, "href" | "isRouterLink">>`
  color: ${({ color }) => color ?? "inherit"};
  font-size: ${({ fontSize }) => fontSize ?? "inherit"};
  cursor: pointer;
`;
