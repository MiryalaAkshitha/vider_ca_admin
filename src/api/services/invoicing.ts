import { http } from "api/http";

const getInvoicingTasks = ({ queryKey }) => {
  return http.get("/invoices/tasks", {
    params: { client: queryKey[1]?.client },
  });
};

const createInvoice = ({ data }) => {
  return http.post("/invoices", data);
};

export { getInvoicingTasks, createInvoice };
