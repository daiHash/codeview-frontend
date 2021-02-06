import styled from "@emotion/styled";
import { Snippet } from "helpers/api/snippets/types";
import React, { useMemo } from "react";
import { formatDatetime } from "utils/formatDatetime";

export const SnippetCard: React.FC<{ snippet: Snippet }> = ({
  snippet: { title, description, createdAt, updatedAt },
}) => {
  const isUpdatedSnippet = useMemo(() => createdAt !== updatedAt, [
    createdAt,
    updatedAt,
  ]);

  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>

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
  padding: 30px 25px;
  width: 100%;
  min-height: 200px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 0px rgba(50, 50, 50, 0.75);
`;

const Datetime = styled.div`
  margin-top: 20px;
  font-size: var(--fontSize-14);
  color: #626262;
`;
