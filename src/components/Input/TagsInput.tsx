import styled from "@emotion/styled";
import { sortTagsWithId } from "components/Tag";
import { useAppContext } from "context";
import { TagResponse } from "helpers/api/snippets/getSnippetTags";
import React, { Fragment, useEffect, useRef, useState } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  setSnippet: React.Dispatch<
    React.SetStateAction<
      | {
          title: string;
          description: string;
          tags: string;
        }
      | {
          title: "";
          description: "";
          snippetContentMD: [""];
          tags: "";
        }
    >
  >;
};

export const TagsInput: React.VFC<Props> = ({
  onChange,
  value,
  keyHandler,
  setSnippet,
}) => {
  const { tags } = useAppContext();
  const [suggestedTags, setSuggestedTags] = useState<TagResponse[]>([]);
  const inputRef = useRef(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || value.split(",").length > 4) {
      e.preventDefault();
      return;
    }

    keyHandler(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTags = e.currentTarget.value.split(", ");
    const tagToFilter =
      currentTags.length > 1
        ? currentTags[currentTags.length - 1]
        : currentTags.join("");
    const regex = new RegExp(tagToFilter);

    const filteredTags = tags.filter(({ tag }) => {
      return tag.match(regex)?.index === 0;
    });

    setSuggestedTags(tagToFilter === "" ? [] : filteredTags);

    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || (value.length === 0 && e.key === ",")) {
      e.preventDefault();
      return;
    }

    // Remove comma when deleting space
    if (e.key === "Backspace") {
      if (value[value.length - 1] === " ") {
        setSnippet((v) => {
          return { ...v, tags: value.slice(0, -1) };
        });
      }
    }
  };

  const onSuggestionSelect = (tag: string) => {
    const currentTags = value.split(", ");
    currentTags.length > 1
      ? (currentTags[currentTags.length - 1] = tag)
      : (currentTags[0] = tag);

    setSnippet((v) => {
      return { ...v, tags: currentTags.join(", ") };
    });
    setSuggestedTags([]);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (value === "") {
      setSuggestedTags([]);
    }
  }, [value]);

  return (
    <Fragment>
      <label>
        Add Tags(Up to 4 tags)
        <input
          ref={inputRef}
          type="text"
          name="tags"
          placeholder="ie. javascript, css, etc"
          title="Add up to 4 tags(ie. javascript, css, etc)"
          value={value}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onChange={onInputChange}
        />
      </label>
      {sortTagsWithId(suggestedTags).length > 0 && (
        <TagSuggestions>
          {suggestedTags.map(({ id, tag }) => (
            <li
              key={`${id}-${tag}`}
              tabIndex={0}
              onClick={() => onSuggestionSelect(tag)}
              onKeyDown={() => onSuggestionSelect(tag)}
            >
              {tag}
            </li>
          ))}
        </TagSuggestions>
      )}
    </Fragment>
  );
};

const TagSuggestions = styled.ul`
  border: 1px solid #e0e0e0;
  border-top-width: 0;
  margin-top: 0;
  width: 100%;

  li {
    cursor: pointer;
    padding: 0 10px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #3e60f9;
  }
`;
