import { http } from "api/http";

const createInvoice = ({ data }) => {
  return http.post("/invoices", data);
};

const getInvoices = ({ queryKey }) => {
  return http.get("/invoices", { params: { ...queryKey[1] } });
};

const getInvoice = ({ queryKey }) => {
  return http.get(`/invoices/${queryKey[1]}`);
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
  getInvoices,
  getInvoice,
  downloadInvoice,
  cancelInvoice,
  submitInvoiceForApproval,
  exportInvoices,
  getNextInvoiceNumber,
};
