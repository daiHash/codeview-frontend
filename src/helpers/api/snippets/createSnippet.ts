import { api } from "utils/api";
import { Snippet } from "./types";

export const createSnippetAPI = (
  data: Pick<Snippet, "title" | "description" | "snippetContentMD" | "tags">
) => {
  return api.post<Snippet>("/snippets", data);
};
