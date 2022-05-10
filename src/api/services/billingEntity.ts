import { http } from "api/http";

const getBillingEntity = () => {
  return http.get("/billing-entities");
};

const createBillingEntity = (data: any) => {
  return http.post("/billing-entities", data);
};

const deleteBillingEntity = ({ id }: any) => {
  return http.delete(`/billing-entities/${id}`);
};

const updateBillingEntity = ({ data, id }: any) => {
  return http.patch(`/billing-entities/${id}`, data);
};

const getBillingEntityDetails = ({ queryKey }: any) => {
  return http.get(`/billing-entities/${queryKey[1]}`);
};
const createBankAccounts = (data: any) => {
  return http.post("/bank-accounts", data);
};
export {
  getBillingEntity,
  createBillingEntity,
  deleteBillingEntity,
  getBillingEntityDetails,
  updateBillingEntity,
  createBankAccounts,
};
