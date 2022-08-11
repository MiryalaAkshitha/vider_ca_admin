import { http } from "api/http";

const getDscRegisters = ({ queryKey }) => {
  return http.get("/dsc-register", { params: { ...queryKey[1] } });
};

const getClients = ({ queryKey }) => {
  return http.get("/dsc-register/clients", { params: { ...queryKey[1] } });
};

const createDscRegister = (data: any) => {
  return http.post("/dsc-register", data);
};

const updateDscRegister = ({ id, data }: any) => {
  return http.put(`/dsc-register/${id}`, data);
};

const deleteDscRegister = (id: number) => {
  return http.delete(`/dsc-register/${id}`);
};

const getDscRegister = ({ queryKey }) => {
  return http.get("/dsc-register/details", { params: { ...queryKey[1] } });
};

const issueOrReceiveDsc = ({ id, data }: any) => {
  return http.post(`/dsc-register/${id}/issue-receive`, data);
};

export {
  getDscRegisters,
  createDscRegister,
  updateDscRegister,
  deleteDscRegister,
  getDscRegister,
  issueOrReceiveDsc,
  getClients,
};
