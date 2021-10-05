import axios from "axios";
import { clearError, updateError } from "redux/reducers/errorSlice";
import store from "redux/store";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
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
    if (err.response.status === 401) {
      if (err.response.config.url == "/auth/login") {
        return Promise.reject(err);
      }
      message.heading = "Session Expired!";
      message.description =
        "Your session has been expired, Please login to continue";
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
    if (err.response.status === 403) {
      message.heading = "Forbidden!";
      message.description =
        "The resource you are trying to access is forbidden.";
    }
    if (err.response.status === 404) {
      message.heading = "Unknown Error!";
      message.description = "Unknown error occurred!";
    }

    if (err.response.status === 400 || err.response.status === 422) {
      store.dispatch(clearError());
      return Promise.reject(err);
    }

    store.dispatch(
      updateError({
        error: err.message,
        statusCode: err.response.status,
        data: err.response?.data,
        message: message,
      })
    );

    return Promise.reject(err);
  }
);
