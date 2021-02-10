import { api } from "utils/api";
import { Snippet } from "./types";

export const getSnippetByIdAPI = (id: string) =>
  api.get<Snippet>(`/snippets/${id}`);
