import { http } from "api/http";

const getEmployeeLogHoursReport = (data: any) => {
  return http.post("/reports/employee-log-hours", data);
};

const exportEmployeeLogHoursReport = (data: any) => {
  return http.post("/reports/employee-log-hours/export", data);
};

export { getEmployeeLogHoursReport, exportEmployeeLogHoursReport };
