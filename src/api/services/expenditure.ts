import { http } from "api/http";

const getExpenditure = ({ queryKey }) => {
  return http.get("/task_expenditure", {
    params: { ...queryKey[1], type: "TASK" },
  });
};

const getUserExpenditure = ({ queryKey }) => {
  return http.get("/task_expenditure", {
    params: { ...queryKey[1], type: "USER" },
  });
};

const addExpenditure = (data: any) => {
  return http.post("/task_expenditure", data);
};

const updateExpenditure = ({ id, data }) => {
  return http.put(`/task_expenditure/${id}`, data);
};

const deleteExpenditure = (id: number) => {
  return http.delete(`/task_expenditure/${id}`);
};

const approveExpenditure = ({ id }) => {
  return http.patch(`task_expenditure/${id}/approve`);
};

const rejectExpenditure = ({ id, data }) => {
  return http.patch(`task_expenditure/${id}/reject`, { reason: data.reason });
};

export {
  getExpenditure,
  addExpenditure,
  updateExpenditure,
  deleteExpenditure,
  getUserExpenditure,
  approveExpenditure,
  rejectExpenditure,
};
