import styled from "@emotion/styled";
import React, { useEffect } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
};

export const TagsInput: React.FC<Props> = ({ onChange, value, keyHandler }) => {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || value.split(",").length > 4) {
      e.preventDefault();
      return;
    }

    keyHandler(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || (value.length === 0 && e.key === ",")) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {});

  return (
    <label>
      Add Tags(Up to 4 tags)
      <input
        type="text"
        name="tags"
        placeholder="ie. javascript, css, etc"
        title="Add up to 4 tags(ie. javascript, css, etc)"
        value={value}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onChange={onChange}
      />
    </label>
  );
};
