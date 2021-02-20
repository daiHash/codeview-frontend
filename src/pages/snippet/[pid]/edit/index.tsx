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
import { LoadingContent } from "components/Loading/LoadingContent";
import { useApi } from "utils/api/useApi";
import { useAppContext } from "context";
import { TagsInput } from "components/Input/TagsInput";
import { Heading2 } from "components/Text/Heading2";

type EditSnippet = Pick<
  Snippet,
  "title" | "description" | "snippetContentMD" | "tags"
>;

export default function EditSnippet() {
  const { isCurrentUser } = useAppContext();
  const router = useRouter();
  const { pid } = router.query;
  const initialState = useRef<EditSnippet>(null);

  const [snippetApi, getSnippet] = useApi(getSnippetByIdAPI);
  const [updateSnippetApi, updateSnippetById] = useApi(updateSnippetByIdAPI);

  const [snippet, setSnippet] = useState<
    Omit<EditSnippet, "tags"> & { tags: string }
  >({
    title: "",
    description: "",
    snippetContentMD: [""],
    tags: "",
  });
  const { renderEditor, md } = useMDEditor(snippet.snippetContentMD[0]);

  const disableButton = useMemo(() => {
    return initialState.current === null
      ? true
      : initialState.current.title === snippet.title &&
          initialState.current.description === snippet.description &&
          initialState.current.snippetContentMD[0] ===
            snippet.snippetContentMD[0] &&
          initialState.current.tags.join(", ") === snippet.tags;
  }, [snippet, initialState.current]);

  const updateSnippet = useCallback(async () => {
    const { snippetContentMD, tags } = snippet;
    if (pid && typeof pid === "string") {
      updateSnippetById(pid, {
        ...snippet,
        snippetContentMD: md ? [md] : snippetContentMD,
        tags: [...new Set(tags.split(", "))],
      });
    }
  }, [snippet, md, pid]);

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (value.split(",").length > 4) {
      e.preventDefault();
      return;
    }

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

  const handleTagsKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (e.key === "," && value.length > 0 && value.split(",").length <= 4) {
      setSnippet((v) => {
        return {
          ...v,
          tags: value.split(", ").length >= 4 ? v.tags : `${v.tags} `,
        };
      });
    }
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
      const {
        title,
        description,
        snippetContentMD,
        tags,
      } = snippetApi.response;
      const currentSnippet = {
        title,
        description,
        snippetContentMD,
        tags,
      };
      initialState.current = currentSnippet;

      setSnippet((snippet) => {
        return {
          ...snippet,
          ...{
            ...currentSnippet,
            tags: currentSnippet.tags.join(", "),
          },
        };
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
                <Heading2>Edit your Code Snippet</Heading2>
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
                <TagsInput
                  setSnippet={setSnippet}
                  onChange={onInputChange}
                  keyHandler={handleTagsKeyInput}
                  value={snippet.tags}
                />
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
    margin: 20px 0;
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
