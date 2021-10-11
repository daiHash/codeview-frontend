import { api } from "utils/api";
import { Snippet } from "./types";

export const createSnippet = (
  data: Pick<Snippet, "title" | "description" | "snippetContentMD" | "tags">
) => {
  return api.post<Snippet>("/snippets", data);
};
