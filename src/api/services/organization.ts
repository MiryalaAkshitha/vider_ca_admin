import { http } from "api/http";

const getOrganization = () => {
  return http.get(`/users/organization`);
};

const getGetStarted = () => {
  return http.get(`/stats/organization/dashboard/get-started`);
};

const getOrganizationDashboard = () => {
  return http.get(`/stats/organization/dashboard`);
};

const getOrganizationLicenses = () => {
  return http.get(`/users/organization/licenses`);
};

const getBankAccounts = ({ queryKey }) => {
  return http.get(`/bank-accounts`, {
    params: {
      type: queryKey[1],
    },
  });
};

const createBankAccount = (data: any) => {
  return http.post(`/bank-accounts`, data);
};

const updateBankAccount = ({ id, data }: any) => {
  return http.put(`/bank-accounts/${id}`, data);
};

const deleteBankAccount = ({ id }: any) => {
  return http.delete(`/bank-accounts/${id}`);
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
  getBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  getOrganizationDashboard,
  getGetStarted,
};
