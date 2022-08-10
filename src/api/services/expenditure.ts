import { http } from "api/http";

const getExpenditure = ({ queryKey }) => {
  return http.get("/expenditure", {
    params: { ...queryKey[1] },
  });
};

const addExpenditure = (data: any) => {
  return http.post("/expenditure", data);
};

const addUserExpenditure = (data: any) => {
  return http.post("/expenditure", data);
};

const updateExpenditure = ({ id, data }) => {
  return http.put(`/expenditure/${id}`, data);
};

const deleteExpenditure = (id: number) => {
  return http.delete(`/expenditure/${id}`);
};

const approveExpenditure = ({ id }) => {
  return http.patch(`expenditure/${id}/approve`);
};

const rejectExpenditure = ({ id, data }) => {
  return http.patch(`expenditure/${id}/reject`, { reason: data.reason });
};

export {
  getExpenditure,
  addExpenditure,
  updateExpenditure,
  deleteExpenditure,
  approveExpenditure,
  rejectExpenditure,
};
