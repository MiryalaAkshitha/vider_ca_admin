import { http } from "api/http";

const createInvoice = ({ data }) => {
  return http.post("/invoices", data);
};

const updateInvoice = ({ data }) => {
  return http.put(`/invoices/${data?.id}`, data);
};

const getInvoices = ({ queryKey }) => {
  return http.get("/invoices", { params: { ...queryKey[1] } });
};

const getClientInvoices = ({ queryKey }) => {
  return http.get(`/invoices/${queryKey[1]}`);
};

const getInvoice = ({ queryKey }) => {
  return http.get(`/invoices/${queryKey[1]}`);
};

const getInvoicePreview = ({ queryKey }) => {
  return http.get(`/invoices/${queryKey[1]}/preview`);
};

const downloadInvoice = ({ id }) => {
  return http.post(`/invoices/${id}/download`);
};

const cancelInvoice = ({ id }) => {
  return http.post(`/invoices/${id}/cancel`);
};

const submitInvoiceForApproval = ({ id }) => {
  return http.post(`/invoices/${id}/submit-for-approval`);
};

const exportInvoices = () => {
  return http.post(`/invoices/export`);
};

const getNextInvoiceNumber = ({ queryKey }) => {
  return http.get(`/invoices/generate/next-invoice-number`, {
    params: {
      billingEntityId: queryKey[1],
    },
  });
};

export {
  createInvoice,
  updateInvoice,
  getInvoices,
  getInvoice,
  getInvoicePreview,
  getClientInvoices,
  downloadInvoice,
  cancelInvoice,
  submitInvoiceForApproval,
  exportInvoices,
  getNextInvoiceNumber,
};