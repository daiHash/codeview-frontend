import React from "react";
import styled from "@emotion/styled";
import { UnderlinedText } from "./UnderLinedText";

export const Heading2: React.FC = ({ children }) => {
  return (
    <H2>
      <UnderlinedText underlineColor={{ plain: "#F9D63E" }}>
        {children}
      </UnderlinedText>
    </H2>
  );
};

const H2 = styled.h2`
  transform: skew(350deg) rotate(-2deg) scaleX(1);
`;
