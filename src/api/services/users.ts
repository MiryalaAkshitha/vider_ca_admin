import { http } from "api/http";

const signup = (data: any) => {
  return http.post("/users/signup", data);
};

const sendOtp = (data: any) => {
  return http.post("/users/otp", data);
};

const verifyOtp = (data: any) => {
  return http.post("/users/otp-verify", data);
};

const signin = (data: any) => {
  return http.post("/users/signin", data);
};

const createUser = (data: any) => {
  return http.post("/users", data);
};

const joinUser = (data: any) => {
  return http.post("/users/join", data);
};

const getUsers = (data: any) => {
  return http.get("/users", data);
};

export { signup, signin, createUser, getUsers, sendOtp, verifyOtp, joinUser };
