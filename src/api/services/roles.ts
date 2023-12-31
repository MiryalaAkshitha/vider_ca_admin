import { http } from "api/http";

interface Data {
  name: string;
  description: string;
}

interface IUpdateData {
  id: number;
  data: {
    name?: string;
    active?: boolean;
    description?: string;
    permissions?: number[];
  };
}

const getAllRoles = () => {
  return http.get("/roles/all");
};

const getRoles = () => {
  return http.get("/roles");
};

const getRole = ({ queryKey }: any) => {
  return http.get(`/roles/${queryKey[1]}`);
};

const getPermissions = () => {
  return http.get("/permissions/tree");
};

const getMyPermissions = () => {
  return http.get("/permissions/mine");
};

const createRole = (data: Data) => {
  return http.post("/roles", data);
};

const deleteRole = (id: number) => {
  return http.delete(`/roles/${id}`);
};

const updateRole = ({ id, data }: IUpdateData) => {
  return http.put(`/roles/${id}`, data);
};

export {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRole,
  getPermissions,
  getAllRoles,
  getMyPermissions,
};
