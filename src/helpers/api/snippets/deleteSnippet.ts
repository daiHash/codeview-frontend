import { api } from "utils/api";

export const deleteSnippetById = (id: string) => {
  return api.delete(`/snippets/${id}`);
};
