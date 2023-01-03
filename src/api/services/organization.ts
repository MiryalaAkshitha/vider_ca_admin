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
  return http.get(`/stats/task-analytics`, {
    params: { type: queryKey[1] },
  });
};

const getTasksDueThisWeek = () => {
  return http.get(`/stats/tasks-due-this-week`);
};

const getTasksByCategory = ({ queryKey }) => {
  return http.get(`/stats/tasks-by-category`, { params: { ...queryKey[1] } });
};

const getTasksByClientCategory = ({ queryKey }) => {
  return http.get(`/stats/tasks-by-client-category`, { params: { ...queryKey[1] } });
};

const getTasksByService = ({ queryKey }) => {
  return http.get(`/stats/tasks-by-service`, { params: { ...queryKey[1] } });
};

const getOverdueTasks = ({ queryKey }) => {
  return http.get(`/stats/over-due-tasks`, { params: { ...queryKey[1] } });
};

const getClientAnalytics = () => {
  return http.get(`/stats/client-analytics`);
};

const getDueDscRegisters = () => {
  return http.get(`/stats/due-dsc-registers`);
};

const getClientsByCategory = () => {
  return http.get(`/stats/clients-by-category`);
};

const getTotalLogHours = () => {
  return http.get(`/stats/total-log-hours`);
};

const getWeeklyLogHours = ({ queryKey }) => {
  return http.get(`/stats/weekly-log-hours`, { params: { ...queryKey[1] } });
};

const getEmployeeTasksByStatus = ({ queryKey }) => {
  return http.get(`/stats/employee-tasks-by-status`, { params: { ...queryKey[1] } });
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
  getTasksByClientCategory,
  getTasksByService,
  getOverdueTasks,
  getClientAnalytics,
  getDueDscRegisters,
  getClientsByCategory,
  getTotalLogHours,
  getWeeklyLogHours,
  getEmployeeTasksByStatus,
};
