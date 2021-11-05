import React from "react";
import styled from "@emotion/styled";

export const Heading1: React.FC<{
  skew?: boolean;
  lineHeight?: string;
  fontSize?: string;
}> = ({ children, lineHeight, fontSize, skew }) => {
  return (
    <H1
      skew={skew}
      lineHeight={lineHeight}
      fontSize={fontSize ?? "var(--fontSize-32)"}
    >
      {children}
    </H1>
  );
};

const H1 = styled.h1<{ skew: boolean; lineHeight: string; fontSize: string }>`
  transform: ${({ skew }) =>
    skew ? "skew(350deg) rotate(-2deg) scaleX(1)" : "none"};
  line-height: ${({ lineHeight }) => lineHeight};
  font-size: ${({ fontSize }) => fontSize};
`;
