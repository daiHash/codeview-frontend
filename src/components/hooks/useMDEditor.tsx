import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export const useMDEditor = () => {
  const [md, setMD] = useState("");
  const currentMD = useRef<string | null>(null);
  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }: { text: string }) => {
    setMD(text);
    currentMD.current = text;
    const currentSnippet = JSON.parse(sessionStorage.getItem("currentSnippet"));

    sessionStorage.setItem(
      "currentSnippet",
      JSON.stringify({ ...currentSnippet, md: text })
    );
  };

  useEffect(() => {
    const currentSnippet = JSON.parse(sessionStorage.getItem("currentSnippet"));
    if (currentSnippet) {
      currentMD.current = currentSnippet.md;
      setMD(currentSnippet.md);
    }

    return () => sessionStorage.removeItem("currentSnippet");
  }, []);

  const render = useCallback(() => {
    return (
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text: string) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={currentMD.current ?? undefined}
      />
    );
  }, []);

  return [render, md] as const;
};
