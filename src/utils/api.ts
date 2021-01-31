import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.API_URL,
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/api"
      : "https://code-snippet-memo.herokuapp.com/api",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin":
      process.env.NODE_ENV !== "production"
        ? "http://localhost:8080"
        : "https://code-snippet-memo-frontend-ekjiz8j5t.vercel.app/",
  },
  responseType: "json",
});
