import { http } from "api/http";

const addToClientInfo = (data: any) => {
  return http.post("/client-info", data);
};

const addFieldToClientInfo = (data: any) => {
  return http.post("/client-info/add-field", data);
};

const updateClientInfo = ({ data }: any) => {
  return http.put("/client-info", data);
};

const deleteClientInfo = (data: any) => {
  return http.delete("/client-info", { params: data });
};

const getClientInfo = ({ queryKey }: any) => {
  return http.get("/client-info", { params: { ...queryKey[1] } });
};

const getClientPasswords = ({ queryKey }: any) => {
  return http.get("/client-passwords", { params: { clientId: queryKey[1] } });
};

const addClientPassword = (data: any) => {
  return http.post("/client-passwords", data);
};

const updateClientPassword = ({ id, data }: any) => {
  return http.put(`/client-passwords/${id}`, data);
};

const deleteClientPassword = (id: number) => {
  return http.delete(`/client-passwords/${id}`);
};

export {
  addToClientInfo,
  getClientInfo,
  updateClientInfo,
  deleteClientInfo,
  getClientPasswords,
  addClientPassword,
  updateClientPassword,
  deleteClientPassword,
  addFieldToClientInfo,
};
