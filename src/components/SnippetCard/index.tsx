import styled from "@emotion/styled";
import { sortTags, Tag } from "components/Tag";
import { Snippet } from "helpers/api/snippets/types";
import React, { useMemo } from "react";
import { formatDatetime } from "utils/formatDatetime";
import Image from "next/image";
import { useToggle } from "utils/hooks/useToggle";
import Heart from "./assets/heart.svg";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { title, description, createdAt, updatedAt, tags, isFavorite },
}) => {
  const [_isFavorite, toggle] = useToggle(isFavorite);

  const isUpdatedSnippet = useMemo(() => createdAt !== updatedAt, [
    createdAt,
    updatedAt,
  ]);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggle();
  };

  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
      <HeartIcon
        onClick={toggleFavorite}
        isFavorite={_isFavorite}
        title={
          _isFavorite
            ? "Remove snippet from favorites"
            : "Add snippet to favorites"
        }
      >
        <Heart />
      </HeartIcon>

      <Tags>
        {sortTags(tags).map((tag, i) => (
          <li key={`${tag}-${i}`}>
            <Tag text={tag} />
          </li>
        ))}
      </Tags>

      <Datetime>
        <p>
          Created: <time>{formatDatetime(createdAt)}</time>
        </p>

        {isUpdatedSnippet && (
          <p>
            Updated: <time>{formatDatetime(updatedAt)}</time>
          </p>
        )}
      </Datetime>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  padding: 30px 25px;
  width: 100%;
  min-height: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10, 10, 10, 0.1),
    0 0 0 1px rgb(10, 10, 10, 0.2);

  p {
    word-wrap: break-word;
  }
`;

const Tags = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin-top: 8px;

  > li {
    &:not(:last-of-type) {
      margin-right: 8px;
    }
  }
`;

const Datetime = styled.div`
  margin-top: 20px;
  font-size: var(--fontSize-14);
  color: #626262;
`;

const HeartIcon = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  cursor: pointer;

  > svg {
    > path {
      fill: ${({ isFavorite }) => (isFavorite ? "#E62255" : "#626262")};
    }
  }
`;
