import { http } from "api/http";

const getInvoicingTasks = ({ queryKey }) => {
  return http.get("/invoices/tasks", {
    params: { ...queryKey[1] },
  });
};

const createEstimate = ({ data }) => {
  return http.post("/estimates", data);
};

const getEstimates = ({ queryKey }) => {
  return http.get("/estimates", { params: { ...queryKey[1] } });
};

const getEstimate = ({ queryKey }) => {
  return http.get(`/estimates/${queryKey[1]}`);
};

const downloadEstimate = ({ id }) => {
  return http.post(`/estimates/${id}/download`);
};

const cancelEstimate = ({ id }) => {
  return http.post(`/estimates/${id}/cancel`);
};

const submitForApproval = ({ id }) => {
  return http.post(`/estimates/${id}/submit-for-approval`);
};

const exportEstimates = () => {
  return http.post(`/estimates/export`);
};

const getNextEstimateNumber = ({ queryKey }) => {
  return http.get(`/estimates/generate/next-estimate-number`, {
    params: {
      billingEntityId: queryKey[1],
    },
  });
};

export {
  getInvoicingTasks,
  createEstimate,
  getEstimates,
  getEstimate,
  downloadEstimate,
  cancelEstimate,
  exportEstimates,
  submitForApproval,
  getNextEstimateNumber,
};
