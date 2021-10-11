import { api } from "utils/api";
import { Snippet } from "./types";

export const getLatestSnippets = (options?: { search?: string }) =>
  api.get<Snippet[]>(
    `/guest/snippets${options?.search ? `?${options?.search}` : ""}`
  );

export const getMyLatestSnippets = (options?: { search?: string }) =>
  api.get<Snippet[]>(
    `/snippets${options?.search ? `?${options?.search}` : ""}`
  );
