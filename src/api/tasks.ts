import { http } from "api/http";

const getTasks = () => http.get("/tasks");

const updateTask = ({ id, data }: { id: number; data: any }) =>
  http.put(`/tasks/${id}`, data);

export { getTasks, updateTask };
