import styled from "@emotion/styled";
import { sortTags, Tag } from "components/Tag";
import { Snippet } from "helpers/api/snippets/types";
import React, { useEffect, useMemo } from "react";
import { formatDatetime } from "utils/formatDatetime";
import { useToggle } from "utils/hooks/useToggle";
import Heart from "./assets/heart.svg";
import { updateSnippetFavoriteAPI } from "helpers/api/snippets/updateSnippetfavorite";
import { useApi } from "utils/api/useApi";
import { useAppContext } from "context";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { id, title, description, createdAt, updatedAt, tags, favorites },
}) => {
  const { isCurrentUser, id: userId } = useAppContext();

  const [_isFavorite, toggle] = useToggle(false);
  const [, updateSnippetFavorite] = useApi(updateSnippetFavoriteAPI);
  const isUpdatedSnippet = useMemo(() => createdAt !== updatedAt, [
    createdAt,
    updatedAt,
  ]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updateSnippetFavorite(id, { isFavorite: !_isFavorite });
    toggle();
  };

  useEffect(() => {
    const favorite = favorites.some((f) => f.userId === userId);
    toggle(favorite);
  }, [userId]);

  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
      {isCurrentUser && (
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
      )}

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
  bottom: 20px;
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
      fill-opacity: ${({ isFavorite }) => (isFavorite ? 1 : 0.4)};
    }
  }
`;
