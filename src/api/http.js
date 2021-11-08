import axios from "axios";
import { clearError } from "redux/reducers/errorSlice";
import store from "redux/store";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
  },
});

http.interceptors.response.use(
  function (response) {
    store.dispatch(clearError());
    return response;
  },
  function (err) {
    const message = {
      heading: "",
      description: "",
    };
    if (err.message === "Network Error") {
      message.heading = err.message;
      message.description = "Please check your internet connection";
    }
    return Promise.reject(err);
  }
);
