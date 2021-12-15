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
  id: number;
  endTime: number;
};

type AddComment = {
  taskId: string;
  data: {
    text: string;
  };
};

type AddAttachment = {
  taskId: number;
  data: FormData;
};

type AddAttachmentFromStorage = {
  taskId: number;
  data: {
    fileIds: number[];
  };
};

const createTask = (data: any) => {
  return http.post("/tasks", data);
};

const createRecurringTask = (data: any) => {
  return http.post("/tasks/recurring", data);
};

const getTasks = () => http.get("/tasks");

const getTasksAsOptions = () => http.get("/tasks/as-options");

const getTask = ({ queryKey }) => {
  return http.get(`/tasks/task-details/${queryKey[1]}`);
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

const addAttachmentsFromStorage = (args: AddAttachmentFromStorage) => {
  let { taskId, data } = args;
  return http.post(`/tasks/${taskId}/attachments/from-storage`, data);
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

const startTimer = ({ taskId, startTime }: StartTimerData) => {
  return http.post(`/tasks/${taskId}/loghours/start-timer`, { startTime });
};

const endTimer = ({ id, endTime }: EndTimerData) => {
  return http.post(`/tasks/loghours/${id}/end-timer`, { endTime });
};

const getLogHours = ({ queryKey }) => {
  return http.get(`/tasks/loghours`, { params: { taskId: queryKey[1] } });
};

const addLogHour = ({ taskId, data }) => {
  return http.post(`/tasks/${taskId}/loghours/add`, data);
};

const getChecklists = ({ queryKey }) => {
  return http.get(`/tasks/checklists`, { params: { taskId: queryKey[1] } });
};

const addChecklist = ({ taskId, data }) => {
  return http.post(`/tasks/${taskId}/checklists`, data);
};

export {
  getTasks,
  getTasksAsOptions,
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
  addAttachmentsFromStorage,
  getLogHours,
  addLogHour,
  getChecklists,
  addChecklist,
};
