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

type AddComment = {
  taskId: string;
  data: {
    text: string;
  };
};

type AddAttachment = {
  taskId: string;
  data: FormData;
};

const createTask = (data: any) => {
  return http.post("/tasks", data);
};

const createRecurringTask = (data: any) => {
  return http.post("/tasks/recurring", data);
};

const getTasks = () => http.get("/tasks");

const getTask = ({ queryKey }) => {
  return http.get("/tasks/task-details", { params: { taskId: queryKey[1] } });
};

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

const getTaskComments = ({ queryKey }) => {
  return http.get(`/tasks/comments`, { params: { taskId: queryKey[1] } });
};

const addComment = ({ taskId, data }: AddComment) => {
  return http.post(`/tasks/${taskId}/comments`, data);
};

const getTaskAttachments = ({ queryKey }) => {
  return http.get(`/tasks/attachments`, { params: { taskId: queryKey[1] } });
};

const addAttachment = ({ taskId, data }: AddAttachment) => {
  return http.post(`/tasks/${taskId}/attachments`, data);
};

const createSubTask = ({ taskId, data }) => {
  return http.post(`/tasks/${taskId}/subtasks`, data);
};

const getSubTasks = ({ queryKey }) => {
  return http.get(`/tasks/subtasks`, { params: { taskId: queryKey[1] } });
};

const updateSubTask = ({ id, data }) => {
  return http.put(`/tasks/${id}/subtasks`, data);
};

export {
  getTasks,
  updateTask,
  reorderTasks,
  updateStatus,
  createTask,
  startTimer,
  endTimer,
  getTask,
  createRecurringTask,
  getTaskComments,
  addComment,
  addAttachment,
  getTaskAttachments,
  createSubTask,
  getSubTasks,
  updateSubTask,
};
