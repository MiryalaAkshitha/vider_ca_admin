import { http } from "api/http";

const signup = (data: any) => {
  return http.post("/users/signup", data);
};

const signin = (data: any) => {
  return http.post("/users/signin", data);
};

const createUser = (data: any) => {
  return http.post("/users", data);
};

const getUsers = (data: any) => {
  return http.get("/users", data);
};

export { signup, signin, createUser, getUsers };
