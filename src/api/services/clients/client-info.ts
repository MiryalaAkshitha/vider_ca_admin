import { http } from "api/http";

const addKybForm = (data: any) => {
  return http.post("/kyb-info", data);
};

const addKybField = (data: any) => {
  return http.post("/kyb-info/add-field", data);
};

const updateKybfields = ({ data }: any) => {
  return http.put("/kyb-info", data);
};

const deleteKybForm = (data: any) => {
  return http.delete(`/kyb-info/${data.formId}`);
};

const getKybForms = ({ queryKey }: any) => {
  return http.get("/kyb-info", { params: { ...queryKey[1] } });
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
  addKybForm,
  getKybForms,
  updateKybfields,
  deleteKybForm,
  getClientPasswords,
  addClientPassword,
  updateClientPassword,
  deleteClientPassword,
  addKybField,
};
