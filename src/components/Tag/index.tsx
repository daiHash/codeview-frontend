import styled from "@emotion/styled";
import { TextLink } from "components/TextLink";
import { Fragment } from "react";

type TagStyles = {
  color?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
};

type Props = {
  text: string;
  styles?: TagStyles;
} & (
  | { isRouterLink: true; href: string }
  | { isRouterLink?: undefined; href?: undefined }
);

export const Tag: React.FC<Props> = (props) => {
  const { text, styles } = props;
  return (
    <Fragment>
      {props.isRouterLink !== undefined ? (
        <TextLink href={props.href} isRouterLink={props.isRouterLink}>
          <StyledTag
            color={styles?.color ?? "#4568fb"}
            fontSize={styles?.fontSize ?? "14px"}
            padding={styles?.padding ?? "2px 10px"}
            borderRadius={styles?.borderRadius ?? "4px"}
          >
            {text}
          </StyledTag>
        </TextLink>
      ) : (
        <StyledTag
          color={styles?.color ?? "#4568fb"}
          fontSize={styles?.fontSize ?? "14px"}
          padding={styles?.padding ?? "2px 10px"}
          borderRadius={styles?.borderRadius ?? "4px"}
        >
          {text}
        </StyledTag>
      )}
    </Fragment>
  );
};

const StyledTag = styled.span<Required<TagStyles>>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  text-align: center;
  border: 1px solid;
`;
