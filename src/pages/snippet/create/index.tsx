import Head from "next/head";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { api } from "utils/api";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Layout } from "layout/Layout";
import { useMDEditor } from "components/hooks/useMDEditor";

// TODO: Add Styles
export default function Create() {
  const router = useRouter();
  const { renderEditor, md } = useMDEditor();

  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
  });

  const createSnippet = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const { title, description } = snippet;
      const res = await api.post("/snippets", {
        title,
        description,
        snippetContentMD: [md],
      });

      if (res) {
        router.push("/");
      }
    },
    [snippet, md]
  );

  const onInputChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
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

      <Layout>
        <main>
          <label>
            Add A Title:
            <input
              type="text"
              name="title"
              id="title"
              value={snippet.title}
              onChange={onInputChange}
            />
          </label>
          <label>
            Add a Desctiption:
            <input
              type="text"
              name="description"
              id="description"
              value={snippet.description}
              onChange={onInputChange}
            />
          </label>

          <h2>Add your Code Snippet</h2>
          <div>{renderEditor()}</div>

          <button onClick={createSnippet}>Create New Code Snippet🧟‍♂️</button>
        </main>
      </Layout>
    </Fragment>
  );
}
