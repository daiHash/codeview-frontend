import React, { Fragment, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { getSnippetById } from "helpers/api/snippets/getSnippetById";
import { Snippet } from "helpers/api/snippets/types";
import { useMDEditor } from "components/hooks/useMDEditor";
import { Button } from "components/Button";

// TODO: Fix styles
export default function SnippetDetail() {
  const router = useRouter();
  const { pid } = router.query;
  const { renderFormatter } = useMDEditor();

  const [
    { title, description, snippetContentMD, createdAt, updatedAt, isUser },
    setSnippet,
  ] = useState<Snippet>({
    id: 0,
    title: "",
    description: "",
    snippetContentMD: [""],
    createdAt: "",
    updatedAt: "",
    isUser: null,
  });

  const buttonStyles = {
    fontSize: "16px",
    padding: "5px 10px",
    width: "80px",
  };

  const sendToEdit = () => {
    if (pid && typeof pid === "string") {
      router.push({ pathname: `/snippet/${pid}/edit` });
    }
  };

  const isUpdatedSnippet = useMemo(() => createdAt !== updatedAt, [
    createdAt,
    updatedAt,
  ]);

  useEffect(() => {
    if (pid && typeof pid === "string") {
      (async () => {
        const snippet = await getSnippetById(pid);
        setSnippet(snippet);
      })();
    }
  }, [pid]);

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo | Snippet Memo</title>
      </Head> */}

      <Layout>
        <h2>{title}</h2>
        <p>{description}</p>
        <SubContent>
          <p>
            Created:
            <time dateTime={createdAt}> {createdAt}</time>
          </p>
          {isUpdatedSnippet && (
            <p>
              <i>・ </i>
              Updated on
              <time dateTime={updatedAt}> {updatedAt}</time>
            </p>
          )}

          {isUser !== null && isUser && (
            <ButtonsWrapper>
              <Button onClick={sendToEdit} styles={buttonStyles} invert>
                Edit
              </Button>
              {/* //TODO: Handle delete */}
              {/* <Button onClick={() => null} styles={buttonStyles} invert>
                Delete
              </Button> */}
            </ButtonsWrapper>
          )}
        </SubContent>

        <div>{renderFormatter(snippetContentMD[0])}</div>
      </Layout>
    </Fragment>
  );
}

const SubContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: var(--fontSize-14);

  p {
    color: #626262;
  }

  @media screen and (max-width: 600px) {
    display: block;

    p {
      i {
        display: none;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  > button {
    &:first-of-type {
      margin-left: 20px;
    }

    & + button {
      margin-left: 15px;
    }
  }

  @media screen and (max-width: 600px) {
    margin-top: 8px;

    > button {
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
`;
