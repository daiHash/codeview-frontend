import { api } from "utils/api";

export type TagResponse = { id: number; tag: string };

export const getSnippetsTagsAPI = () => api.get<TagResponse[]>("/tags");
