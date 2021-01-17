import styled from "@emotion/styled";
import React, { Fragment } from "react";
import Link from "next/link";

type Props = {
  color?: string;
  fontSize?: string;
  href: string;
  isRouterLink?: boolean;
};

export const TextLink: React.FC<Props> = ({
  children,
  href,
  color,
  fontSize,
  isRouterLink,
}) => {
  return (
    <Fragment>
      {isRouterLink ? (
        <Link href={href}>
          <A color={color} fontSize={fontSize} tabIndex={0}>
            {children}
          </A>
        </Link>
      ) : (
        <A href={href} color={color} fontSize={fontSize}>
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
