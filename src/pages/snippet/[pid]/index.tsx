import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Layout } from "layout/Layout";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { getSnippetById } from "helpers/api/snippets/getSnippetById";
import { Snippet } from "helpers/api/snippets/types";
import { useMDEditor } from "components/hooks/useMDEditor";

// TODO: Fix styles

export default function SnippetDetail() {
  const router = useRouter();
  const { pid } = router.query;
  const { renderFormatter, md } = useMDEditor();

  const [snippet, setSnippet] = useState<Snippet>({
    id: 0,
    title: "",
    description: "",
    snippetContentMD: [""],
    createdAt: "",
    updatedAt: "",
  });

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
        <h2>{snippet.title}</h2>
        <p>{snippet.description}</p>
        <time>{snippet.createdAt}</time>

        <div>{renderFormatter(snippet.snippetContentMD[0])}</div>
      </Layout>
    </Fragment>
  );
}
