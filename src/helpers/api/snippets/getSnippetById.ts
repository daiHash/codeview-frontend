import { api } from "utils/api";
import { formatDatetime } from "utils/formatDatetime";
import { Snippet } from "./types";

export const getSnippetById = async (id: string) => {
  const res = await api.get<Snippet>(`/guest/snippet/${id}`);
  if (!res) {
    return null;
  }
  return {
    ...res.data,
    createdAt: formatDatetime(res.data.createdAt),
    updatedAt: formatDatetime(res.data.updatedAt),
  };
};
