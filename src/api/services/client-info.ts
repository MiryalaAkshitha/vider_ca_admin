import { http } from "api/http";

const addToClientInfo = (data: any) => {
  return http.post("/client-info", data);
};

const updateClientInfo = ({ data }: any) => {
  return http.put("/client-info", data);
};
const deleteClientInfo = (data: any) => {
  return http.delete("/client-info", { params: data });
};

const getClientInfo = ({ queryKey }) => {
  return http.get("/client-info", { params: { ...queryKey[1] } });
};

export { addToClientInfo, getClientInfo, updateClientInfo, deleteClientInfo };
