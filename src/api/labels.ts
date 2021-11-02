import { http } from "api/http";

interface Data {
  name: string;
  color: string;
}

const getLabels = () => http.get("/labels");

const createLabel = (data: Data) => http.post("/labels", data);

const deleteLabel = (id: number) => http.delete(`/labels/${id}`);

const updateLabel = ({ id, data }: { id: number; data: Data }) =>
  http.put(`/labels/${id}`, data);

export { getLabels, createLabel, updateLabel, deleteLabel };
