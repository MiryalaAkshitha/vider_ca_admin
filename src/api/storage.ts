import { http } from "api/http";

interface CreateFolder {
  name: string;
  clientId: string;
  folderId: string | null;
}

interface GetStorage {
  folderId: string | null;
  clientId: string;
}

const getStorage = ({ queryKey }) => {
  const params: GetStorage = queryKey[1];
  return http.get("/storage", { params });
};

const createFolder = (data: CreateFolder) => {
  return http.post("/storage/create-folder", data);
};

export { createFolder, getStorage };
