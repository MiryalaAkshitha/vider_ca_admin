import { http } from "api/http";

const getOrganization = () => {
  return http.get(`/organization`);
};

const getGetStarted = () => {
  return http.get(`/get-started`);
};

const updateGetStarted = (data: any) => {
  return http.patch(`/get-started`, data);
};

const getOrganizationLicenses = ({ queryKey }) => {
  return http.get(`/organization-lincenses`, {
    params: {
      ...queryKey[1],
    },
  });
};

const getBankAccounts = ({ queryKey }) => {
  return http.get(`/bank-accounts`, {
    params: {
      ...queryKey[1],
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
  return http.post(`/organization-lincenses`, data);
};

const updateOrganizationLicense = ({ id, data }: any) => {
  return http.patch(`/organization-lincenses/${id}`, data);
};

const updateOrganization = ({ data }: any) => {
  return http.patch(`/organization`, data);
};

const deleteOrganizationLicense = ({ id }: any) => {
  return http.delete(`/organization-lincenses/${id}`);
};

const getTaskAnalytics = ({ queryKey }) => {
  return http.get(`/organization/stats/task-analytics`, {
    params: {
      type: queryKey[1],
    },
  });
};

const getTasksDueThisWeek = () => {
  return http.get(`/organization/stats/tasks-due-this-week`);
};

const getTasksByCategory = () => {
  return http.get(`/organization/stats/tasks-by-category`);
};

const getTasksByService = () => {
  return http.get(`/organization/stats/tasks-by-service`);
};

const getOverdueTasks = () => {
  return http.get(`/organization/stats/over-due-tasks`);
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
  getTaskAnalytics,
  getGetStarted,
  updateGetStarted,
  getTasksDueThisWeek,
  getTasksByCategory,
  getTasksByService,
  getOverdueTasks,
};
