import { http } from "api/http";

const saveAuthToken = ({ queryKey }) => {
  return http.post("/onedrive/save-token", { ...queryKey[1] });
};

const getOneDriveItems = ({ queryKey }) => {
  return http.get("/onedrive", { params: { ...queryKey[1] } });
};

const reAuthorize = () => {
  return http.post("/onedrive/re-authorize");
};

export { getOneDriveItems, saveAuthToken, reAuthorize };
