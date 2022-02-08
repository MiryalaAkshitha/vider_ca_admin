import { http } from "api/http";

const getOrganization = ({ queryKey }: any) => {
  return http.get(`/organization`);
};

const updateOrganization = ({ data }: any) => {
  return http.put(`/organization/${data.id}`, data);
};

export { getOrganization, updateOrganization };
