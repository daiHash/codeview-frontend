import { api } from "utils/api";
import { Snippet } from "./types";

export const getLatestSnippetsAPI = () => api.get<Snippet[]>("/guest/snippets");

export const getMyLatestSnippetsAPI = () => api.get<Snippet[]>("/snippets");
