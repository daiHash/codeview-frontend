import React from "react";
import styled from "@emotion/styled";
import { UnderlinedText } from "./UnderLinedText";

type Props = {
  skew?: boolean;
  underlineColor?: string;
  type?: "h1" | "h2";
} & Pick<
  React.ComponentProps<typeof UnderlinedText>,
  "padding" | "underlineHeight"
>;

export const UnderlinedHeading: React.FC<Props> = ({
  children,
  skew,
  padding,
  underlineColor,
  underlineHeight,
  type = "h1",
}) => {
  const styles = {
    transform: skew ? "skew(350deg) rotate(-2deg) scaleX(1)" : "none",
  };

  if (type === "h1") {
    return (
      <h1 css={styles}>
        <UnderlinedText
          underlineColor={{ plain: underlineColor ?? "#F9D63E" }}
          underlineHeight={underlineHeight}
          padding={padding}
        >
          {children}
        </UnderlinedText>
      </h1>
    );
  }

  if (type === "h2") {
    return (
      <h2 css={styles}>
        <UnderlinedText
          underlineColor={{ plain: underlineColor ?? "#F9D63E" }}
          underlineHeight={underlineHeight}
          padding={padding}
        >
          {children}
        </UnderlinedText>
      </h2>
    );
  }
};

const H2 = styled.h2<Pick<Props, "skew">>`
  transform: ${({ skew }) =>
    skew ? "skew(350deg) rotate(-2deg) scaleX(1)" : "none"};
`;
