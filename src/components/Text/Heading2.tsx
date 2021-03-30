import React from "react";
import styled from "@emotion/styled";

export const Heading2: React.FC<{
  skew?: boolean;
  lineHeight?: string;
  fontSize?: string;
}> = ({ children, lineHeight, fontSize, skew }) => {
  return (
    <H2
      skew={skew}
      lineHeight={lineHeight}
      fontSize={fontSize ?? "var(--fontSize-32)"}
    >
      {children}
    </H2>
  );
};

const H2 = styled.h2<{ skew: boolean; lineHeight: string; fontSize: string }>`
  transform: ${({ skew }) =>
    skew ? "skew(350deg) rotate(-2deg) scaleX(1)" : "none"};
  line-height: ${({ lineHeight }) => lineHeight};
  font-size: ${({ fontSize }) => fontSize};
`;
