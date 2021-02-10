import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api"
    : "https://code-snippet-memo.herokuapp.com/api";

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
      baseURL,
      xsrfHeaderName: "X-CSRF-Token",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV !== "production"
            ? "http://localhost:8080"
            : "https://codesnippetmemo.vercel.app/",
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
  get<R>(url: string) {
    return request<R>({ method: "get", url });
  },
  post<R>(url: string, data?: unknown) {
    return request<R>({ method: "post", url, data });
  },
  put<R>(url: string, data?: unknown) {
    return request<R>({ method: "put", url, data });
  },
};
