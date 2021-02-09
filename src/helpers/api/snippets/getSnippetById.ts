import { api2 } from "utils/api";
import { Snippet } from "./types";

export const getSnippetByIdAPI = (id: string) =>
  api2.get<Snippet>(`/snippets/${id}`);
