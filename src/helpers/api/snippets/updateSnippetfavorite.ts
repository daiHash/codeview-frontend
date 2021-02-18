import { api } from "utils/api";
import { Snippet } from "./types";

export const updateSnippetFavoriteAPI = (
  id: number,
  data: { isFavorite: boolean }
) => {
  return api.put<Snippet>(`/snippets/${id}/favorite`, data);
};
