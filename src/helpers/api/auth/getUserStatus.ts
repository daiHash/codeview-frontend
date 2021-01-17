import { api } from "utils/api";

export type UserStatus = {
  isCurrentUser: boolean | undefined;
};

export const getUserStatus = async () => {
  const res = await api.get<UserStatus>("/auth/current_user");

  if (res) {
    return res.data;
  }
};
