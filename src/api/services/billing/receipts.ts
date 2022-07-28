import { http } from "api/http";

const createReceipt = ({ data }) => {
  return http.post("/receipts", data);
};

const getReceipts = ({ queryKey }) => {
  return http.get("/receipts", { params: { ...queryKey[1] } });
};

const getCreditBalance = ({ queryKey }) => {
  return http.get("/receipts/credit-balance", { params: { ...queryKey[1] } });
};

const getNextReceiptNumber = () => {
  return http.get(`/receipts/generate/next-receipt-number`);
};

export { createReceipt, getReceipts, getCreditBalance, getNextReceiptNumber };
