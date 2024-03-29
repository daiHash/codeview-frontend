import styled from "@emotion/styled";
import { sortTags, Tag } from "components/Tag";
import { Snippet } from "helpers/api/snippets/types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { formatDatetime } from "utils/formatDatetime";
import { useToggle } from "utils/hooks/useToggle";
import Heart from "./assets/heart.svg";
import { useApi } from "utils/api/useApi";
import { useAppContext } from "context";
import { updateSnippetFavorite } from "helpers/api/snippets/updateSnippetsFavorite";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { id, title, description, createdAt, updatedAt, tags, favorites },
}) => {
  const { isCurrentUser, id: userId } = useAppContext();

  const isProcessing = useRef(false);
  const [_favorites, setFavorites] = useState(favorites.length);
  const [_isFavorite, toggle] = useToggle(false);
  const [snippetFavoriteApi, updateCodeSnippetFavorite] = useApi(
    updateSnippetFavorite
  );

  // Just for debug
  // const [, clearSnippetFavorite] = useApi(clearSnippetFavoriteAPI);
  const isUpdatedSnippet = useMemo(
    () => createdAt !== updatedAt,
    [createdAt, updatedAt]
  );

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isProcessing.current) return;
    isProcessing.current = true;
    await updateCodeSnippetFavorite(id, { isFavorite: !_isFavorite });
  };

  useEffect(() => {
    if (snippetFavoriteApi.status === "failed") {
      isProcessing.current = false;
      return;
    }

    if (snippetFavoriteApi.status === "succeeded") {
      _isFavorite ? setFavorites((f) => f - 1) : setFavorites((f) => f + 1);
      toggle();

      isProcessing.current = false;
    }
  }, [snippetFavoriteApi.status]);

  useEffect(() => {
    const favorite = favorites.some((f) => f.userId === userId);
    toggle(favorite);
  }, [userId]);

  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
      {isCurrentUser && (
        <>
          <HeartIcon
            onClick={toggleFavorite}
            isFavorite={_isFavorite}
            title={
              _isFavorite
                ? "Remove snippet from favorites"
                : "Add snippet to favorites"
            }
          >
            <span>{_favorites}</span>
            <Heart />
          </HeartIcon>
          {/* Remove after clearing debug*/}
          {/* {userId === 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                clearSnippetFavorite(id);
              }}
            >
              Clear {userId}
            </button>
          )} */}
        </>
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
  height: 240px;
  min-height: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10, 10, 10, 0.1),
    0 0 0 1px rgb(10, 10, 10, 0.2);

  p {
    display: -webkit-box;
    word-wrap: break-word;
    max-height: 55px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
  right: 10px;
  z-index: 10;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;

  > span {
    margin: 0 2px 2px 0;
  }

  > svg {
    > path {
      fill: ${({ isFavorite }) => (isFavorite ? "#E62255" : "#626262")};
      fill-opacity: ${({ isFavorite }) => (isFavorite ? 1 : 0.4)};
    }
  }
`;
