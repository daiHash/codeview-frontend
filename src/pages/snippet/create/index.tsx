import Head from "next/head";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { api } from "utils/api";
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
import { Button } from "components/Button";
import { Snippet } from "helpers/api/snippets/types";
import { useAppContext } from "context";
import { TagsInput } from "components/Input/TagsInput";
import { Heading2 } from "components/Text/Heading2";

export default function CreateSnippet() {
  const { isCurrentUser } = useAppContext();
  const router = useRouter();
  const initialState = useRef<
    Pick<Snippet, "title" | "description" | "snippetContentMD" | "tags">
  >({
    title: "",
    description: "",
    snippetContentMD: [""],
    tags: [""],
  });
  const { renderEditor, md } = useMDEditor();

  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const disableButton = useMemo(() => {
    return initialState.current === null
      ? true
      : initialState.current.title === snippet.title ||
          initialState.current.description === snippet.description ||
          initialState.current.snippetContentMD[0] === md ||
          initialState.current.tags[0] === snippet.tags;
  }, [snippet, initialState.current, md]);

  const createSnippet = useCallback(async () => {
    const { title, description, tags } = snippet;

    const res = await api.post("/snippets", {
      title,
      description,
      snippetContentMD: [md],
      tags: [...new Set(tags.split(", "))],
    });

    if (res) {
      router.push("/");
    }
  }, [snippet, md]);

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

  useEffect(() => {
    const currentSnippet = JSON.parse(sessionStorage.getItem("currentSnippet"));
    if (currentSnippet) {
      setSnippet((v) => {
        return { ...v, ...currentSnippet };
      });
    }

    return () => sessionStorage.removeItem("currentSnippet");
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Code Snippet Memo | Create New Snippet Memo</title>
      </Head>

      <Layout isAllowed={!!isCurrentUser}>
        <main>
          <Heading>
            <Heading2>Add your Code Snippet</Heading2>
            <ButtonWrapper>
              <Button onClick={createSnippet} disabled={disableButton}>
                Add New Snippet
              </Button>
            </ButtonWrapper>
          </Heading>

          <InputsWrapper>
            <label>
              <span>Add Title:</span>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="New snippet title here..."
                value={snippet.title}
                onChange={onInputChange}
              />
            </label>

            <TagsInput
              onChange={onInputChange}
              keyHandler={handleTagsKeyInput}
              value={snippet.tags}
              setSnippet={setSnippet}
            />
            <label>
              <span>Add Description:</span>
              <textarea
                name="description"
                id="description"
                placeholder="Write a brief description here..."
                value={snippet.description}
                onChange={onInputChange}
              />
            </label>
          </InputsWrapper>
          <div>{renderEditor()}</div>
        </main>
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
      padding: 10px;
    }
  }
`;
