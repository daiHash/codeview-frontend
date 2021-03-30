import React from "react";
import styled from "@emotion/styled";
import { UnderlinedText } from "./UnderLinedText";

type Props = {
  skew?: boolean;
  underlineColor?: string;
} & Pick<
  React.ComponentProps<typeof UnderlinedText>,
  "padding" | "underlineHeight"
>;

export const UnderlinedHeading2: React.FC<Props> = ({
  children,
  skew,
  padding,
  underlineColor,
  underlineHeight,
}) => {
  return (
    <H2 skew={skew}>
      <UnderlinedText
        underlineColor={{ plain: underlineColor ?? "#F9D63E" }}
        underlineHeight={underlineHeight}
        padding={padding}
      >
        {children}
      </UnderlinedText>
    </H2>
  );
};

const H2 = styled.h2<Pick<Props, "skew">>`
  transform: ${({ skew }) =>
    skew ? "skew(350deg) rotate(-2deg) scaleX(1)" : "none"};
`;
