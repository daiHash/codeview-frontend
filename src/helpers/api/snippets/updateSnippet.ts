import { api } from "utils/api";
import { Snippet } from "./types";

export const updateSnippetById = (
  id: string,
  data: Pick<Snippet, "title" | "description" | "snippetContentMD" | "tags">
) => {
  return api.put<Snippet>(`/snippets/${id}`, data);
};
