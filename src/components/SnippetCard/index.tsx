import styled from "@emotion/styled";
import { Snippet } from "helpers/api/snippets/types";
import React from "react";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { id, title, description, snippetContentMD },
}) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #eee;
  padding: 20px;
  width: 100%;
`;
