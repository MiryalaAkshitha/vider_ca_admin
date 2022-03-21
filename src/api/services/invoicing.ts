import { http } from "api/http";

const getInvoicingTasks = ({ queryKey }) => {
  return http.get("/invoicing/tasks", {
    params: { client: queryKey[1]?.client },
  });
};

export { getInvoicingTasks };
