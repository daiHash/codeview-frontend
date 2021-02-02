import styled from "@emotion/styled";
import { Snippet } from "helpers/api/snippets/types";
import React from "react";
import { formatDatetime } from "utils/formatDateTime";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { id, title, description, createdAt },
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
  border: 1px solid #eee;
  padding: 20px;
  width: 100%;
`;
