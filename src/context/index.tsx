import { UserStatus, getUserStatusAPI } from "helpers/api/auth/getUserStatus";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "utils/api/useApi";

const initialStatus: UserStatus = {
  isCurrentUser: undefined,
  username: "",
  avatarUrl: "",
  snippets: [],
};

const AppContext = createContext<UserStatus>(initialStatus);

export const AppWrapper = ({ children }) => {
  const [userStatus, setUserStatus] = useState<UserStatus>(initialStatus);
  const [userStatusApi] = useApi(getUserStatusAPI, {
    autoCall: true,
  });

  useEffect(() => {
    if (userStatusApi.status === "succeeded") {
      setUserStatus((user) => {
        return { ...user, ...userStatusApi.response };
      });
    }
  }, [userStatusApi.status]);

  return (
    <AppContext.Provider value={userStatus}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
