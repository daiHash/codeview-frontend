import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://localhost:3000/api",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
