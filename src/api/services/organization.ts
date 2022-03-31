import { http } from "api/http";

const getOrganization = () => {
  return http.get(`/users/organization`);
};

const getOrganizationLicenses = () => {
  return http.get(`/users/organization/licenses`);
};

const createOrganizationLicense = ({ data }: any) => {
  return http.post(`/users/organization/licenses`, data);
};

const updateOrganizationLicense = ({ id, data }: any) => {
  return http.patch(`/users/organization/licenses/${id}`, data);
};

const updateOrganization = ({ data }: any) => {
  return http.patch(`/users/organization`, data);
};

const deleteOrganizationLicense = ({ id }: any) => {
  return http.delete(`/users/organization/licenses/${id}`);
};

export {
  getOrganization,
  updateOrganization,
  getOrganizationLicenses,
  createOrganizationLicense,
  updateOrganizationLicense,
  deleteOrganizationLicense,
};
