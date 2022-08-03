import { http } from "api/http";
import { QueryType } from "api/types";

type StartTimerData = {
  taskId: number;
  startTime: number;
};

type EndTimerData = {
  id: number;
  endTime: number;
};

const startTimer = ({ taskId, startTime }: StartTimerData) => {
  return http.post(`log-hours/start-timer`, { startTime, taskId });
};

const endTimer = ({ id, endTime }: EndTimerData) => {
  return http.post(`log-hours/${id}/end-timer`, { endTime });
};

const getLogHours = ({ queryKey }: QueryType) => {
  return http.get(`/log-hours`, { params: { taskId: queryKey[1] } });
};

const getUserLogHours = ({ queryKey }) => {
  return http.get(`/log-hours/user`, { params: { ...queryKey[1] } });
};

const getUserLogHourStats = ({ queryKey }) => {
  return http.get(`/log-hours/user/stats`, { params: { ...queryKey[1] } });
};

const addLogHour = ({ data }: any) => {
  return http.post(`/log-hours/add`, data);
};

const addUserLogHour = ({ data }: any) => {
  return http.post(`/log-hours/user/add`, data);
};

const updateLogHour = ({ id, data }: any) => {
  return http.put(`/log-hours/${id}`, data);
};

const deleteLogHour = (id: number) => {
  return http.delete(`/log-hours/${id}`);
};

export {
  startTimer,
  endTimer,
  getLogHours,
  addLogHour,
  addUserLogHour,
  updateLogHour,
  deleteLogHour,
  getUserLogHours,
  getUserLogHourStats,
};
