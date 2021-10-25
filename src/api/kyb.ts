import { http } from "api/http";

const addToKybInfo = (data: any) => http.post("/kyb-info", data);
const updateKybInfo = ({ clientId, data }: any) => http.put("/kyb-info", data);
const deleteKybInfo = (data: any) => http.delete("/kyb-info", { params: data });

const getKybInfo = ({ queryKey }) =>
  http.get("/kyb-info", { params: { ...queryKey[1] } });

export { addToKybInfo, getKybInfo, updateKybInfo, deleteKybInfo };
