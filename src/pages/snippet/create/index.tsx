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

// TODO: Add Styles
export default function CreateSnippet() {
  const { isCurrentUser } = useAppContext();
  const router = useRouter();
  const initialState = useRef<
    Pick<Snippet, "title" | "description" | "snippetContentMD">
  >({
    title: "",
    description: "",
    snippetContentMD: [],
    // tags: [],
  });
  const { renderEditor, md } = useMDEditor();

  // TODO: Handle tags inputs
  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
  });

  const disableButton = useMemo(() => {
    return initialState.current === null
      ? true
      : initialState.current.title === snippet.title ||
          initialState.current.description === snippet.description ||
          initialState.current.snippetContentMD[0] === md;
  }, [snippet, initialState.current, md]);

  const createSnippet = useCallback(async () => {
    const { title, description } = snippet;
    const res = await api.post("/snippets", {
      title,
      description,
      snippetContentMD: [md],
      tags: [],
    });

    if (res) {
      router.push("/");
    }
  }, [snippet, md]);

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
            <h2>Add your Code Snippet</h2>
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
                value={snippet.title}
                onChange={onInputChange}
              />
            </label>
            <label>
              <span>Add Description:</span>
              <textarea
                name="description"
                id="description"
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
