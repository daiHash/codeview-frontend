import { getUserStatus, UserStatus } from "helpers/api/auth/getUserStatus";
import React, { createContext, useContext, useEffect, useState } from "react";

const initialStatus = { isCurrentUser: undefined };

const AppContext = createContext<UserStatus>(initialStatus);

export const AppWrapper = ({ children }) => {
  const [userStatus, setUserStatus] = useState<UserStatus>(initialStatus);

  useEffect(() => {
    (async () => {
      const currentUser = await getUserStatus();
      setUserStatus(currentUser);
    })();
  }, []);

  return (
    <AppContext.Provider value={userStatus}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
