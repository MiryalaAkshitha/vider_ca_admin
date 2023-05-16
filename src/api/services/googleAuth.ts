import { http } from "api/http";

const verifyGmailUser = async (data: any) => {
  return http.post("/common/verifygmailuser", {data});
};

export {
  verifyGmailUser
};
