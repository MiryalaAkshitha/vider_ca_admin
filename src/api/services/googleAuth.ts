import { http } from "api/http";

const verifyGmailUser = async (data: any) => {
  return http.post("/gmail/verifyuser", {data});
};

export {
  verifyGmailUser
};
