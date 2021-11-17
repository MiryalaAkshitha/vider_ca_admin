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

const getStorageTree = ({ queryKey }) => {
  return http.get("/storage/tree", { params: { clientId: queryKey[1] } });
};

const getStorageMutation = (params: GetStorage) => {
  return http.get("/storage", { params });
};

const createFolder = (data: CreateFolder) => {
  return http.post("/storage/create-folder", data);
};

const uploadFile = (data: any) => {
  return http.post("/storage/upload-file", data);
};

const moveFile = ({ fileId, folderId }: any) => {
  return http.put(`/storage/move-file/${fileId}`, { folderId });
};

export {
  createFolder,
  getStorage,
  uploadFile,
  moveFile,
  getStorageMutation,
  getStorageTree,
};
