import Head from "next/head";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layout } from "layout/Layout";
import { useMDEditor } from "components/hooks/useMDEditor";
import { getSnippetByIdAPI } from "helpers/api/snippets/getSnippetById";
import { Snippet } from "helpers/api/snippets/types";
import { updateSnippetByIdAPI } from "helpers/api/snippets/updateSnippet";
import { Button } from "components/Button";
import deepEqual from "deep-equal";
import { LoadingContent } from "components/Loading/LoadingContent";
import { useApi } from "utils/api/useApi";
import { useAppContext } from "context";

type EditSnippet = Pick<Snippet, "title" | "description" | "snippetContentMD">;

export default function EditSnippet() {
  const { isCurrentUser } = useAppContext();
  const router = useRouter();
  const { pid } = router.query;
  const initialState = useRef<EditSnippet>(null);

  const [snippetApi, getSnippet] = useApi(getSnippetByIdAPI);
  const [updateSnippetApi, updateSnippetById] = useApi(updateSnippetByIdAPI);

  const [snippet, setSnippet] = useState<EditSnippet>({
    title: "",
    description: "",
    snippetContentMD: [""],
  });
  const { renderEditor, md } = useMDEditor(snippet.snippetContentMD[0]);

  const disableButton = useMemo(() => {
    return initialState.current === null
      ? true
      : deepEqual(initialState.current, snippet);
  }, [snippet, initialState.current]);

  const updateSnippet = useCallback(async () => {
    if (pid && typeof pid === "string") {
      updateSnippetById(pid, {
        ...snippet,
        snippetContentMD: md ? [md] : snippet.snippetContentMD,
      });
    }
  }, [snippet, md, pid]);

  const onInputChange = ({
    currentTarget: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    setSnippet((v) => {
      return { ...v, [name]: value };
    });
    const currentSnippet = JSON.parse(sessionStorage.getItem("currentSnippet"));
    if (currentSnippet) {
      const current = { ...currentSnippet };
      sessionStorage.setItem(
        "currentSnippet",
        JSON.stringify({ ...current, [name]: value })
      );
      return;
    }
    sessionStorage.setItem("currentSnippet", JSON.stringify({ [name]: value }));
  };

  // TODO: Fix to keep state of session
  useEffect(() => {
    const currentSnippet = JSON.parse(sessionStorage.getItem("currentSnippet"));
    if (currentSnippet) {
      setSnippet((v) => {
        return { ...v, ...currentSnippet };
      });
    }

    return () => sessionStorage.removeItem("currentSnippet");
  }, []);

  useEffect(() => {
    if (updateSnippetApi.status === "succeeded") {
      router.push("/");
    }
  }, [updateSnippetApi.status]);

  useEffect(() => {
    if (pid && typeof pid === "string") {
      getSnippet(pid);
    }
  }, [pid]);

  useEffect(() => {
    if (snippetApi.status === "succeeded") {
      initialState.current = snippetApi.response;
      setSnippet((snippet) => {
        return { ...snippet, ...initialState.current };
      });
    }
  }, [snippetApi.status]);

  useEffect(() => {
    setSnippet((v) => {
      return { ...v, snippetContentMD: [md] };
    });
  }, [md]);

  return (
    <Fragment>
      <Head>
        <title>Code Snippet Memo | Edit Snippet Memo</title>
      </Head>

      <Layout isAllowed={!!isCurrentUser && snippetApi.response?.isUser}>
        <LoadingContent
          isLoading={
            snippetApi.status === "loading" || initialState.current === null
          }
          marginTop="20%"
        >
          {snippetApi.status === "succeeded" && (
            <Fragment>
              <Heading>
                <h2>Edit your Code Snippet</h2>
                <ButtonWrapper>
                  <Button onClick={updateSnippet} disabled={disableButton}>
                    Update Code Snippet
                  </Button>
                </ButtonWrapper>
              </Heading>

              <InputsWrapper>
                <label>
                  <span>Edit Title:</span>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={snippet.title}
                    onChange={onInputChange}
                  />
                </label>
                <label>
                  <span>Edit Description:</span>
                  <textarea
                    name="description"
                    id="description"
                    value={snippet.description}
                    onChange={onInputChange}
                  />
                </label>
              </InputsWrapper>

              <div>{renderEditor()}</div>
            </Fragment>
          )}
        </LoadingContent>
      </Layout>
    </Fragment>
  );
}

const ButtonWrapper = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 850px) {
    margin: 0 0 20px 0;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 20px;

  @media screen and (max-width: 850px) {
    display: block;
  }
`;

const InputsWrapper = styled.div`
  margin: 20px 0 40px;

  label {
    display: block;
    font-size: var(--fontSize-20);

    & + label {
      margin-top: 20px;
    }
    span {
      display: block;
    }

    input,
    textarea {
      font-size: 1rem;
      border: 1px solid #e0e0e0;
      height: 2.5rem;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    input {
      padding: 0 10px;
    }

    textarea {
      min-height: 100px;
      max-height: 100px;
      padding: 10px 20px;
    }
  }
`;
