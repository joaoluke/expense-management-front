import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_PROD_API_URL;

export const API = axios.create({
  baseURL: apiUrl,
});
