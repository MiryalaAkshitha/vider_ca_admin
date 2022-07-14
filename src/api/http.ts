import axios from "axios";
import { setGlobalLoading } from "redux/reducers/globalSlice";
import store from "redux/store";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
  },
});

http.interceptors.request.use(
  function (config) {
    store.dispatch(setGlobalLoading(true));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    store.dispatch(setGlobalLoading(false));
    return response;
  },
  function (err) {
    store.dispatch(setGlobalLoading(false));

    if (err.message === "Network Error") {
      alert("Network Error");
    }
    if (
      err.response.data.statusCode === 401 &&
      err.response.config.method === "get"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
