import { api } from "utils/api";

export type TagResponse = { id: number; tag: string };

export const getSnippetsTags = () => api.get<TagResponse[]>("/tags");
