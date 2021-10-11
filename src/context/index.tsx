import { UserStatus, getUserStatusAPI } from "helpers/api/auth/getUserStatus";
import {
  getSnippetsTags,
  TagResponse,
} from "helpers/api/snippets/getSnippetTags";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "utils/api/useApi";

type AppState = UserStatus & { tags: TagResponse[] };

const initialStatus: AppState = {
  isCurrentUser: undefined,
  username: "",
  avatarUrl: "",
  snippets: [],
  id: 0,
  tags: [],
};

const AppContext = createContext<AppState>(initialStatus);

export const AppWrapper: React.FC = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(initialStatus);
  const [userStatusApi] = useApi(getUserStatusAPI, {
    autoCall: true,
  });
  const [snippetsTagsApi] = useApi(getSnippetsTags, {
    autoCall: true,
  });

  useEffect(() => {
    if (userStatusApi.status === "succeeded") {
      setAppState((appState) => {
        return { ...appState, ...userStatusApi.response };
      });
    }
  }, [userStatusApi.status]);

  useEffect(() => {
    if (snippetsTagsApi.status === "succeeded") {
      setAppState((appState) => {
        return { ...appState, tags: snippetsTagsApi.response };
      });
    }
  }, [snippetsTagsApi.status]);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
