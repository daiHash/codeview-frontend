import { UserStatus, getUserStatusAPI } from "helpers/api/auth/getUserStatus";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "utils/api/useApi";

const initialStatus = { isCurrentUser: undefined };

const AppContext = createContext<UserStatus>(initialStatus);

export const AppWrapper = ({ children }) => {
  const [userStatus, setUserStatus] = useState<UserStatus>(initialStatus);
  const [userStatusApi, getUserStatus] = useApi(getUserStatusAPI, {
    autoCall: true,
  });

  useEffect(() => {
    if (userStatusApi.status === "succeeded") {
      setUserStatus(userStatusApi.response);
    }
  }, [userStatusApi.status]);

  return (
    <AppContext.Provider value={userStatus}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
