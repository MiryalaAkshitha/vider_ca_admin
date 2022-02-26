import { http } from "api/http";

const saveToken = (data: any) => {
  return http.post("/notifications/token", data);
};

export { saveToken };
