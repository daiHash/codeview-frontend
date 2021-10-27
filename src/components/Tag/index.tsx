import styled from "@emotion/styled";
import { TextLink } from "components/TextLink";
import { TagResponse } from "helpers/api/snippets/getSnippetTags";
import React from "react";

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

export const sortTagsWithId = (tags: TagResponse[]) => {
  return tags.sort((a, b) => a.tag.localeCompare(b.tag));
};

export const sortTags = (tags: string[]) => {
  return tags.sort((a, b) => a.localeCompare(b));
};

export const Tag: React.FC<Props> = (props) => {
  const { text, styles } = props;
  return (
    <>
      {props.isRouterLink !== undefined ? (
        <TextLink href={props.href} isRouterLink={props.isRouterLink}>
          <StyledTag
            color={styles?.color ?? "#3E60F9"}
            fontSize={styles?.fontSize ?? "14px"}
            padding={styles?.padding ?? "2px 10px"}
            borderRadius={styles?.borderRadius ?? "4px"}
          >
            {text}
          </StyledTag>
        </TextLink>
      ) : (
        <StyledTag
          color={styles?.color ?? "#3E60F9"}
          fontSize={styles?.fontSize ?? "14px"}
          padding={styles?.padding ?? "2px 10px"}
          borderRadius={styles?.borderRadius ?? "4px"}
        >
          {text}
        </StyledTag>
      )}
    </>
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
