import { http } from "api/http";
import { TaskStatus } from "views/taskboard/board/utils";

type UpdateStatus = {
  id: number;
  status: TaskStatus;
  sourceItemsOrder: number[];
  destinationItemsOrder: number[];
};

type StartTimerData = {
  taskId: number;
  startTime: number;
};

type EndTimerData = {
  taskId: number;
  endTime: number;
};

const createTask = (data: any) => {
  return http.post("/tasks", data);
};

const getTasks = () => http.get("/tasks");

const reorderTasks = (items: number[]) => {
  return http.put("/tasks/reorder/", { items });
};

const updateStatus = (data: UpdateStatus) => {
  const { id, ...body } = data;
  return http.put(`/tasks/update-status/${id}`, body);
};

const updateTask = ({ id, data }: { id: number; data: any }) => {
  return http.put(`/tasks/${id}`, data);
};

const startTimer = ({ taskId, startTime }: StartTimerData) => {
  return http.post(`/tasks/${taskId}/start-timer`, { startTime });
};

const endTimer = ({ taskId, endTime }: EndTimerData) => {
  return http.post(`/tasks/${taskId}/end-timer`, { endTime });
};

export {
  getTasks,
  updateTask,
  reorderTasks,
  updateStatus,
  createTask,
  startTimer,
  endTimer,
};
