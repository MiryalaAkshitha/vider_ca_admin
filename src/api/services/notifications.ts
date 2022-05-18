import { http } from "api/http";

const saveToken = (data: any) => {
  return http.post("/notifications/token", data);
};

const getNotifications = () => {
  return http.get("/notifications");
};

export { saveToken, getNotifications };
