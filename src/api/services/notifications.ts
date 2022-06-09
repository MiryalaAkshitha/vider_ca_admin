import { http } from "api/http";

const saveToken = (data: any) => {
  return http.post("/notifications/token", data);
};

const getNotifications = ({ queryKey }) => {
  return http.get("/notifications", {
    params: {
      ...queryKey[1],
    },
  });
};

export { saveToken, getNotifications };
