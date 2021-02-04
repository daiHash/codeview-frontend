import styled from "@emotion/styled";
import { Snippet } from "helpers/api/snippets/types";
import React from "react";
import { formatDatetime } from "utils/formatDatetime";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { title, description, createdAt },
}) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
      <time>{formatDatetime(createdAt)}</time>
    </Card>
  );
};

const Card = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 0px rgba(50, 50, 50, 0.75);
`;
