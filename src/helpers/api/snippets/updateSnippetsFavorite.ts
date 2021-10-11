import { api } from "utils/api";
import { Snippet } from "./types";

export const updateSnippetFavorite = (
  id: number,
  data: { isFavorite: boolean }
) => {
  return api.put<Snippet>(`/snippets/${id}/favorite`, data);
};

// remove after clearing just for debug
export const clearSnippetFavoriteAPI = (id: number) => {
  return api.put<Snippet>(`/snippets/${id}/clear/favorite`);
};
