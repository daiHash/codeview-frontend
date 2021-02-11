import { api } from "utils/api";
import { UserSnippet } from "./types";

export const getSnippetByIdAPI = (id: string) =>
  api.get<UserSnippet>(`/snippets/${id}`);
