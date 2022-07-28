import { http } from "api/http";

const getApprovals = ({ queryKey }) => {
  return http.get("/approvals", { params: { ...queryKey[1] } });
};

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

const updateTaskApprovals = ({ taskId, approvalHierarchyId }: any) => {
  return http.post(`/approvals/task`, {
    taskId,
    approvalHierarchyId,
  });
};

const updateIrpoApprovals = ({ iproId, approvalHierarchyId }: any) => {
  return http.post(`/approvals/ipro`, {
    iproId,
    approvalHierarchyId,
  });
};

const updateEstimateApprovals = ({ estimateId, approvalHierarchyId }: any) => {
  return http.post(`/approvals/estimate`, {
    estimateId,
    approvalHierarchyId,
  });
};

const updateInvoiceApprovals = ({ invoiceId, approvalHierarchyId }: any) => {
  return http.post(`/approvals/invoice`, {
    invoiceId,
    approvalHierarchyId,
  });
};

const updateApproval = (data: any) => {
  const { approvalId, status, remarks } = data;
  return http.patch(`/approvals/${approvalId}`, {
    status,
    remarks,
  });
};

export {
  getApprvalHeirarchies,
  createApprovalHeirarchy,
  getApprvalHeirarchyDetails,
  updateAppHierarchy,
  deleteAppHierarchy,
  getApprovals,
  updateTaskApprovals,
  updateApproval,
  updateIrpoApprovals,
  updateEstimateApprovals,
  updateInvoiceApprovals,
};
