import { api } from "utils/api";
import { Snippet } from "./types";

export const getLatestSnippets = async () => {
  const res = await api.get<Snippet[]>("/guest/snippets");
  if (!res) {
    return [];
  }
  return res.data;
};
