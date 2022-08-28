import { http } from "api/http";

const getEmployeeLogHoursReport = (data: any) => {
  return http.post("/reports/employee-log-hours", data);
};

const exportEmployeeLogHoursReport = (data: any) => {
  return http.post("/reports/employee-log-hours/export", data);
};

const getClientsReport = (data: any) => {
  return http.post("/reports/clients", data);
};

const exportClientsReport = (data: any) => {
  return http.post("/reports/clients/export", data);
};

const getTasksReport = (data: any) => {
  return http.post("/reports/tasks", data);
};

const exportTasksReport = (data: any) => {
  return http.post("/reports/tasks/export", data);
};

export {
  getEmployeeLogHoursReport,
  exportEmployeeLogHoursReport,
  getClientsReport,
  exportClientsReport,
  getTasksReport,
  exportTasksReport,
};
