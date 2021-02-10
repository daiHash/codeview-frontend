import { api } from "utils/api";

export type UserStatus = {
  isCurrentUser: boolean | undefined;
};

export const getUserStatusAPI = () => {
  return api.get<UserStatus>("/auth/current_user");
};
