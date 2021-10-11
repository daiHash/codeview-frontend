import { api } from "utils/api";
import { UserSnippet } from "./types";

export const getSnippetById = (id: string) =>
  api.get<UserSnippet>(`/snippets/${id}`);
