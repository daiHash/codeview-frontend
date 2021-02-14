import { api } from "utils/api";
import { Snippet } from "./types";

export const updateSnippetByIdAPI = (
  id: string,
  data: Pick<Snippet, "title" | "description" | "snippetContentMD">
) => {
  return api.put<Snippet>(`/snippets/${id}`, data);
};