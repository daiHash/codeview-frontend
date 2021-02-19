import styled from "@emotion/styled";
import React, { useMemo } from "react";

type Props = {
  underlineWidth?: string;
  padding?: string;
  fontWeight?: number;
  underlineHeight?: string;
} & (
  | {
      underlineColor: {
        plain: string;
        gradient?: undefined;
      };
    }
  | {
      underlineColor: {
        plain?: undefined;
        gradient: string;
      };
    }
);

/**
 * @param {string} underlineColor Underline color. pass 'plain: color' for one plain color and 'gradient' for multiple gradient color
 * @param {number} underlineHeight Height of underline relative to text. default: 0.2em
 * @param {number} underlineWidth Width of underline. default: 100%
 * @param {number} padding Padding is added to modify underline position in relation to the text default: 0
 * @param {number} fontWeight FontWeight of underline text. default: 600
 */
export const UnderlinedText: React.FC<Props> = (props) => {
  const {
    padding,
    fontWeight,
    underlineHeight,
    underlineWidth,
    children,
  } = props;
  const underlineTextPadding = useMemo(() => {
    return `${padding ?? "0"}`;
  }, [padding]);
  const _underlineHeight = useMemo(() => {
    return `${underlineHeight ?? "0.2em"}`;
  }, [underlineHeight]);
  const _underlineWidth = useMemo(() => {
    return `${underlineWidth ?? "100%"}`;
  }, [underlineWidth]);
  const underlineTextFontWeight = useMemo(() => {
    return fontWeight ?? 600;
  }, [fontWeight]);
  const color = useMemo(
    () =>
      props.underlineColor.gradient !== undefined
        ? props.underlineColor.gradient
        : `${props.underlineColor.plain}, ${props.underlineColor.plain}`,
    [props.underlineColor]
  );
  return (
    <Underline
      color={color}
      padding={underlineTextPadding}
      fontWeight={underlineTextFontWeight}
      underlineHeight={_underlineHeight}
      underlineWidth={_underlineWidth}
    >
      {children}
    </Underline>
  );
};
const Underline = styled.em<{
  color: string;
  underlineHeight: string;
  fontWeight: number;
  padding: string;
  underlineWidth: string;
}>`
  padding: ${({ padding }) => padding};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-feature-settings: "palt";
  letter-spacing: -0.1px;
  background-image: ${({ color }) => `linear-gradient(
    ${color}
    )`};
  background-repeat: no-repeat;
  background-position: 50% 100%;
  background-size: ${({ underlineWidth, underlineHeight }) =>
    `${underlineWidth} ${underlineHeight}`};
`;
