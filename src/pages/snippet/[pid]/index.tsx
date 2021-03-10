import React, { Fragment, useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { getSnippetByIdAPI } from "helpers/api/snippets/getSnippetById";
import { useMDEditor } from "components/hooks/useMDEditor";
import { Button } from "components/Button";
import { useApi } from "utils/api/useApi";
import { LoadingContent } from "components/Loading/LoadingContent";
import { formatDatetime } from "utils/formatDatetime";
import { sortTags, Tag } from "components/Tag";
import { Heading2 } from "components/Text/Heading2";

export default function SnippetDetail() {
  const router = useRouter();
  const { pid } = router.query;
  const { renderFormatter } = useMDEditor();
  const codeRef = useRef<HTMLDivElement>();

  const SnippetId = useMemo<string>(() => {
    if (pid && typeof pid === "string") {
      return pid;
    }
  }, [pid]);
  const [snippetApi, getSnippet] = useApi(() => getSnippetByIdAPI(SnippetId));

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

  useEffect(() => {
    if (pid && typeof pid === "string") {
      getSnippet();
    }
  }, [pid]);

  useEffect(() => {
    const codeWrapper = codeRef.current;
    const codes = codeRef.current?.querySelectorAll("section > div");

    console.log("Outside", codeWrapper, codes);

    if (codeWrapper && snippetApi.status === "succeeded") {
      const code = codeWrapper.querySelectorAll("section pre");
      console.log("Page:", { code });
    }
  }, [snippetApi.status]);

  return (
    <Fragment>
      {/* <Head>
        <title>Code Snippet Memo | Snippet Memo</title>
      </Head> */}

      <Layout>
        <LoadingContent
          isLoading={snippetApi.status === "loading"}
          marginTop="30%"
        >
          {snippetApi.status === "succeeded" && (
            <Fragment>
              <Heading2>{snippetApi.response.title}</Heading2>
              <Description>{snippetApi.response.description}</Description>
              <Tags>
                {sortTags(snippetApi.response.tags).map((tag, i) => (
                  <li key={`${tag}-${i}`}>
                    <Tag text={tag} href={`/snippets/${tag}`} isRouterLink />
                  </li>
                ))}
              </Tags>
              <SubContent>
                <p>
                  Created:
                  <time
                    dateTime={formatDatetime(snippetApi.response.createdAt)}
                  >
                    {" "}
                    {formatDatetime(snippetApi.response.createdAt)}
                  </time>
                </p>
                {formatDatetime(snippetApi.response.createdAt) !==
                  formatDatetime(snippetApi.response.updatedAt) && (
                  <p>
                    <i>・ </i>
                    Updated on
                    <time
                      dateTime={formatDatetime(snippetApi.response.updatedAt)}
                    >
                      {" "}
                      {formatDatetime(snippetApi.response.updatedAt)}
                    </time>
                  </p>
                )}

                {snippetApi.response.isUser !== null &&
                  snippetApi.response.isUser && (
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

              <div ref={codeRef}>
                {renderFormatter(snippetApi.response.snippetContentMD[0])}
              </div>
            </Fragment>
          )}
        </LoadingContent>
      </Layout>
    </Fragment>
  );
}

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

const Description = styled.p`
  margin-top: 20px;
`;
