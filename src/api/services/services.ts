import { http } from "api/http";

const getServices = () => {
  return http.get("/services");
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

export { getServices, createService, getService, updateService, deleteService };
