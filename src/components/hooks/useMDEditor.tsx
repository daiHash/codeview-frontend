import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import styled from "@emotion/styled";
import "react-markdown-editor-lite/lib/index.css";

// const useCopyToClipboard = (text: string) => {
//   const copyToClipboard = (str: string) => {
//     const el = document.createElement("textarea");
//     el.value = str;
//     el.setAttribute("readonly", "");
//     el.style.position = "absolute";
//     el.style.left = "-9999px";
//     document.body.appendChild(el);
//     const selected =
//       document.getSelection().rangeCount > 0
//         ? document.getSelection().getRangeAt(0)
//         : false;
//     el.select();
//     const success = document.execCommand("copy");
//     document.body.removeChild(el);
//     if (selected) {
//       document.getSelection().removeAllRanges();
//       document.getSelection().addRange(selected);
//     }
//     return success;
//   };

//   const [copied, setCopied] = useState(false);

//   const copy = useCallback(() => {
//     if (!copied) setCopied(copyToClipboard(text));
//   }, [text]);
//   useEffect(() => () => setCopied(false), [text]);

//   return [copied, copy];
// };

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

/**
 * TODO: Handle copy code feature
 * TODO: update input
 */

export const useMDEditor = (defaultMD?: string) => {
  const [md, setMD] = useState("");

  // const [copied, copy] = useCopyToClipboard("hey");
  const currentMD = useRef<string | null>(null);
  const mdParser = new MarkdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' +
        new MarkdownIt().utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  });

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

  // useEffect(() => {
  //   if (defaultMD) {
  //     setMD(defaultMD);
  //   }
  // }, [defaultMD]);

  // useEffect(() => {
  //   const code = document.querySelectorAll("pre");
  //   if (code) {
  //     for (let i = 0; i < code.length; i++) {
  //       const element = code[i];
  //       element.style.position = "relative";
  //       const icon = document.createElement("span");
  //       icon.innerText = "copy";
  //       icon.style.position = "absolute";
  //       icon.style.top = "0";
  //       icon.style.right = "10px";
  //       if (element.children[0].innerHTML !== "") {
  //         element.appendChild(icon);
  //         icon.addEventListener("click", () => {
  //           // copy();
  //         });
  //       }
  //       console.log(element.children);
  //     }
  //   }
  // }, [md]);

  const renderEditor = useCallback(() => {
    return (
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text: string) => mdParser.render(text)}
        onChange={handleEditorChange}
        value={currentMD.current || defaultMD || ""}
      />
    );
  }, [defaultMD]);

  const renderFormatter = useCallback((mdContent: string) => {
    return (
      <Wrapper>
        <MdEditor
          renderHTML={(text: string) => mdParser.render(text)}
          value={mdContent}
          view={{ menu: false, md: false }}
        />
      </Wrapper>
    );
  }, []);

  return { renderEditor, md, renderFormatter } as const;
};

const Wrapper = styled.section`
  > div {
    border: 0;
    section > div {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;
