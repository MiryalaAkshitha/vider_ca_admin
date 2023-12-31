import { http } from "api/http";

interface CreateFolder {
  name: string;
  clientId?: string;
  parent: string | null;
  type: "organization" | "client" | "task";
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

const createLink = (data: any) => {
  return http.post("/storage/create-link", data);
};

const moveFile = (data: any) => {
  return http.put(`/storage/move-file`, data);
};

const getStorage = ({ queryKey }: any) => {
  const params: GetStorage = queryKey[1];
  return http.get("/storage", { params });
};

const getTotalStorage = ({ queryKey }: any) => {
  const clientId = queryKey[1];
  return http.get("/storage/total-storage", { params: { clientId } });
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

const replaceFileOrFolder = (data: any) => {
  return http.post(`/storage/replace`, data);
};

const keepBothFilesOrFolders = (data: any) => {
  return http.post(`/storage/keep-both`, data);
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
  replaceFileOrFolder,
  keepBothFilesOrFolders,
  getTotalStorage,
  createLink,
};
