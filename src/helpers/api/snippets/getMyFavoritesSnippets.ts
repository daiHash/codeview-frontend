import { api } from "utils/api";
import { Snippet } from "./types";

export const getMyFavoritesSnippetsAPI = (options?: { search?: string }) =>
  api.get<Snippet[]>("/snippets/favorites");
