import { http } from "api/http";

const createApprovalHeirarchy = (data: any) => {
  return http.post("/approval-hierarchy", data);
};

const updateAppHierarchy = ({ id, data }: any) => {
  return http.put(`/approval-hierarchy/${id}`, data);
};

const deleteAppHierarchy = (id: number) => {
  return http.delete(`/approval-hierarchy/${id}`);
};

const getApprvalHeirarchies = ({ queryKey }) => {
  return http.get("/approval-hierarchy", { params: { ...queryKey[1] } });
};

const getApprvalHeirarchyDetails = ({ queryKey }) => {
  return http.get(`/approval-hierarchy/${queryKey[1]}`);
};

export {
  getApprvalHeirarchies,
  createApprovalHeirarchy,
  getApprvalHeirarchyDetails,
  updateAppHierarchy,
  deleteAppHierarchy,
};
