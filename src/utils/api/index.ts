import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type ApiResponse<T> =
  | {
      error: undefined;
      data: T;
    }
  | {
      error: AxiosError;
      data: undefined;
    };

async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const res = await axios.request<T>({
      timeout: 10000,
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      xsrfHeaderName: "X-CSRF-Token",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
      },
      responseType: "json",
      ...config,
    });
    return { error: undefined, data: res.data };
  } catch (error) {
    return { error, data: undefined };
  }
}

export const api = {
  get<R>(url: string, options?: AxiosRequestConfig) {
    return request<R>({ method: "get", url, ...options });
  },
  post<R>(url: string, data?: unknown) {
    return request<R>({ method: "post", url, data });
  },
  put<R>(url: string, data?: unknown) {
    return request<R>({ method: "put", url, data });
  },
};
