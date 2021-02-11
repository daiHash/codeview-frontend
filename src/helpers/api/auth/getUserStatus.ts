import { api } from "utils/api";
import { Snippet } from "../snippets/types";

export type UserStatus = {
  id: number;
  isCurrentUser: boolean | undefined;
  username: string;
  avatarUrl: string;
  snippets: Snippet[];
};

export const getUserStatusAPI = () => {
  return api.get<UserStatus>("/auth/current_user");
};
