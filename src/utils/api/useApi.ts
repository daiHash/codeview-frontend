import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "utils/api";
interface Options {
  autoCall?: boolean;
}
export type UseApiResponse<T> =
  | {
      status: "initialized";
      isLoaded: false;
      error: undefined;
      response: undefined;
    }
  | {
      status: "loading";
      isLoaded: false;
      error: undefined;
      response: undefined;
    }
  | {
      status: "succeeded";
      isLoaded: true;
      error: undefined;
      response: T;
    }
  | {
      status: "failed";
      isLoaded: true;
      error: AxiosError;
      response: undefined;
    };

export const useApi = <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options?: Options
) => {
  const defaultApiState: UseApiResponse<T> = {
    status: "initialized",
    isLoaded: false,
    error: undefined,
    response: undefined,
  };
  const [apiState, setApiState] = useState<UseApiResponse<T>>(
    options?.autoCall
      ? { ...defaultApiState, status: "loading" }
      : defaultApiState
  );
  const callApi = async () => {
    if (!options?.autoCall) {
      setApiState({ ...defaultApiState, status: "loading" });
    }
    const { error, data } = await apiCall();
    if (error) {
      setApiState({
        ...defaultApiState,
        status: "failed",
        isLoaded: true,
        error,
      });
    }
    if (data) {
      setApiState({
        ...defaultApiState,
        status: "succeeded",
        isLoaded: true,
        response: data,
      });
    }
  };
  useEffect(() => {
    if (options?.autoCall) {
      callApi();
    }
  }, []);
  return [apiState, callApi] as const;
};
