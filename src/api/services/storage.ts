import { http } from "api/http";

interface CreateFolder {
  name: string;
  clientId: string;
  folderId: string | null;
}

interface GetStorage {
  folderId: string | null;
  clientId: string;
  search?: string;
}

const createFolder = (data: CreateFolder) => {
  return http.post("/storage/create-folder", data);
};

const uploadFile = (data: any) => {
  return http.post("/storage/upload-file", data);
};

const moveFile = ({ fileId, folderId }: any) => {
  return http.put(`/storage/move-file/${fileId}`, { folderId });
};

const getStorage = ({ queryKey }: any) => {
  const params: GetStorage = queryKey[1];
  return http.get("/storage", { params });
};

const searchStorage = (params: any) => {
  return http.get("/storage", { params });
};

const getStorageTree = ({ queryKey }: any) => {
  return http.get("/storage/tree", { params: { clientId: queryKey[1] } });
};

const renameFile = (data: any) => {
  return http.post("/storage/rename-file", data);
};

const removeFile = (id: number) => {
  return http.delete(`/storage/remove-file/${id}`);
};

export {
  createFolder,
  getStorage,
  uploadFile,
  moveFile,
  getStorageTree,
  renameFile,
  removeFile,
  searchStorage,
};
