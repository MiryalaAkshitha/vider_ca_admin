import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
  },
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    if (err.message === "Network Error") {
      alert("Please Check your internet connection");
    }
    if (err.response.data.statusCode === 401) {
      console.log(err.response.config);
      if (
        err.response.config.url !== "/users/signin" &&
        err.response.config.url !== "/users/signup"
      ) {
        localStorage.removeItem("token");
        alert("Session Expired, Please Login Again");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
