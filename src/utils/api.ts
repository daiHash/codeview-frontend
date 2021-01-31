import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.API_URL,
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://code-snippet-memo.herokuapp.com/api",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
