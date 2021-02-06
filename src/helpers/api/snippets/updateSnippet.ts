import { api } from "utils/api";
import { formatDatetime } from "utils/formatDatetime";
import { Snippet } from "./types";

export const updateSnippetById = async (
  id: string,
  data: Pick<Snippet, "title" | "description" | "snippetContentMD">
) => {
  const res = await api.put<Snippet>(`/snippets/${id}`, data);
  if (!res) {
    return null;
  }
  return {
    ...res.data,
    createdAt: formatDatetime(res.data.createdAt),
    updatedAt: formatDatetime(res.data.updatedAt),
  };
};
