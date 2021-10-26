import { http } from "api/http";

const addToClientInfo = (data: any) => http.post("/client-info", data);
const updateClientInfo = ({ clientId, data }: any) =>
  http.put("/client-info", data);
const deleteClientInfo = (data: any) =>
  http.delete("/client-info", { params: data });

const getClientInfo = ({ queryKey }) =>
  http.get("/client-info", { params: { ...queryKey[1] } });

export { addToClientInfo, getClientInfo, updateClientInfo, deleteClientInfo };
