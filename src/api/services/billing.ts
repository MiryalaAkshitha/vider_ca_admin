import { http } from "api/http";

const getInvoicingTasks = ({ queryKey }) => {
  return http.get("/invoices/tasks", {
    params: { client: queryKey[1]?.client },
  });
};

const createInvoice = ({ data }) => {
  return http.post("/invoices", data);
};

const createEstimate = ({ data }) => {
  return http.post("/estimates", data);
};

const getEstimates = ({ queryKey }) => {
  return http.get("/estimates", { params: { ...queryKey[1] } });
};

export { getInvoicingTasks, createInvoice, createEstimate, getEstimates };
