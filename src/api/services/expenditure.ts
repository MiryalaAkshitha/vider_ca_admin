import { http } from "api/http";

const getExpenditure = ({ queryKey }) => {
  return http.get("/task_expenditure", { params: { ...queryKey[1] } });
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

export { getExpenditure, addExpenditure, updateExpenditure, deleteExpenditure };
