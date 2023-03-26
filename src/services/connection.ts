import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_PROD_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.pathname = "/";
    }
    return Promise.reject(err);
  }
);

export default API;

export const defaultsHeadersAxios = (token: string) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
