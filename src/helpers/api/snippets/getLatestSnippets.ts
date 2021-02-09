import { api, api2 } from "utils/api";
import { Snippet } from "./types";

export const getLatestSnippetsAPI = () =>
  api2.get<Snippet[]>("/guest/snippets");

export const getMyLatestSnippetsAPI = () => api2.get<Snippet[]>("/snippets");
