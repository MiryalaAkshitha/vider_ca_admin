import { http } from "api/http";

const getServices = ({ queryKey }) => {
  return http.get("/services", { params: { ...queryKey[1] } });
};

const getDefaultServices = ({ queryKey }) => {
  return http.get("/services/default", { params: { ...queryKey[1] } });
};

const importServices = (data: any) => {
  return http.post("/services/import", data);
};

const getService = ({ queryKey }) => {
  return http.get(`/services/${queryKey[1]}`);
};

const createService = (data: any) => {
  return http.post("/services", data);
};

const updateService = ({ id, data }: any) => {
  return http.put(`/services/${id}`, data);
};

const deleteService = ({ id }: any) => {
  return http.delete(`/services/${id}`);
};

const cloneService = ({ id }: any) => {
  return http.post(`/services/${id}/clone`);
};

const updateAdminServices = () => {
  return http.post(`/services/update-admin-services`);
};

export {
  getServices,
  getDefaultServices,
  importServices,
  createService,
  getService,
  updateService,
  deleteService,
  cloneService,
  updateAdminServices,
};
