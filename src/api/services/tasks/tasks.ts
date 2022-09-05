import { http } from "api/http";
import { QueryType } from "api/types";
import { TaskStatus } from "data/constants";

type UpdateStatus = {
  id: number;
  status: TaskStatus;
  sourceItemsOrder: number[];
  destinationItemsOrder: number[];
};

type AddComment = {
  taskId: string;
  data: {
    text: string;
    parentId?: number;
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

const getTasks = ({ queryKey }) => {
  return http.get("/tasks", {
    params: {
      queryType: "ORGANIZATION",
      ...queryKey[1],
    },
  });
};

const getUserTasks = ({ queryKey }) => {
  return http.get("/tasks/user", {
    params: {
      ...queryKey[1],
    },
  });
};

const getTasksAsOptions = () => {
  return http.get("/tasks/as-options");
};

const getTask = ({ queryKey }: any) => {
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

const addRemark = ({ id, data }: { id: number; data: any }) => {
  return http.post(`/tasks/${id}/remarks`, data);
};

const getTaskComments = ({ queryKey }: QueryType) => {
  return http.get(`/tasks/comments`, { params: { taskId: queryKey[1] } });
};

const addComment = ({ taskId, data }: AddComment) => {
  return http.post(`/tasks/${taskId}/comments`, data);
};

const getTaskAttachments = ({ queryKey }: QueryType) => {
  return http.get(`/tasks/attachments`, { params: { taskId: queryKey[1] } });
};

const addAttachment = ({ taskId, data }: AddAttachment) => {
  return http.post(`/tasks/${taskId}/attachments`, data);
};

const addAttachmentsFromStorage = (args: AddAttachmentFromStorage) => {
  let { taskId, data } = args;
  return http.post(`/tasks/${taskId}/attachments/from-storage`, data);
};

const createSubTask = ({ taskId, data }: any) => {
  return http.post(`/tasks/${taskId}/subtasks`, data);
};

const getChecklists = ({ queryKey }: QueryType) => {
  return http.get(`/tasks/checklists`, { params: { taskId: queryKey[1] } });
};

const addChecklist = ({ taskId, data }: any) => {
  return http.post(`/tasks/${taskId}/checklists`, data);
};

const updateChecklist = ({ data }: any) => {
  return http.put(`/tasks/checklists/update`, data);
};

const addChecklistItems = ({ checklistId, data }: any) => {
  return http.post(`/tasks/checklists/${checklistId}`, data);
};

const updateChecklistItem = ({ data }: any) => {
  return http.put(`/tasks/checklists/checklist-items/update`, data);
};

const deleteChecklist = ({ id }: { id: number }) => {
  return http.delete(`/tasks/checklists/${id}`);
};

const deleteChecklistItem = ({ id }: { id: number }) => {
  return http.delete(`/tasks/checklists/checklist-items/${id}`);
};

const getMilestones = ({ queryKey }: QueryType) => {
  return http.get(`/tasks/milestones`, { params: { taskId: queryKey[1] } });
};

const addMilestone = ({ taskId, data }: any) => {
  return http.post(`/tasks/${taskId}/milestones`, data);
};

const updateMilestone = ({ id, data }: any) => {
  return http.put(`/tasks/milestones/${id}`, data);
};

const deleteMilestone = (id: number) => {
  return http.delete(`/tasks/milestones/${id}`);
};

const getDDForms = ({ queryKey }: any) => {
  return http.get(`/due-diligence`, {
    params: {
      taskUid: queryKey[1]?.taskUid,
      taskId: queryKey[1]?.taskId,
    },
  });
};

const createDDForm = ({ data }: any) => {
  return http.post(`/due-diligence`, data);
};

const addDDFormField = ({ formId, data }: any) => {
  return http.post(`/due-diligence/${formId}/fields`, data);
};

const deleteDDFormField = (formFieldId: number) => {
  return http.delete(`/due-diligence/fields/${formFieldId}`);
};

const updateDDFormField = ({ data }: any) => {
  return http.put(`/due-diligence/fields/`, data);
};

const reorderDDFormFields = (items: number[]) => {
  return http.put(`/due-diligence/fields/reorder`, { items });
};

const terminateTask = ({ id, reason }: any) => {
  return http.post(`/tasks/${id}/terminate`, { reason });
};

const deleteTask = ({ id }: any) => {
  return http.post(`/tasks/${id}/delete`);
};

const getStageOfWork = ({ queryKey }: QueryType) => {
  return http.get(`/tasks/stage-of-work`, { params: { taskId: queryKey[1] } });
};

const addStageOfWork = ({ taskId, data }: any) => {
  return http.post(`/tasks/${taskId}/stage-of-work`, data);
};

const updateStageOfWork = ({ id, data }: any) => {
  return http.put(`/tasks/stage-of-work/${id}`, data);
};

const deleteStageOfWork = (id: number) => {
  return http.delete(`/tasks/stage-of-work/${id}`);
};

export {
  getTasks,
  getTasksAsOptions,
  updateTask,
  reorderTasks,
  updateStatus,
  createTask,
  getTask,
  createRecurringTask,
  getTaskComments,
  addComment,
  addAttachment,
  getTaskAttachments,
  createSubTask,
  addAttachmentsFromStorage,
  getChecklists,
  addChecklist,
  addChecklistItems,
  updateChecklistItem,
  updateChecklist,
  deleteChecklist,
  deleteChecklistItem,
  getMilestones,
  addMilestone,
  deleteMilestone,
  updateMilestone,
  getDDForms,
  createDDForm,
  addDDFormField,
  reorderDDFormFields,
  deleteDDFormField,
  updateDDFormField,
  terminateTask,
  deleteTask,
  getUserTasks,
  getStageOfWork,
  updateStageOfWork,
  deleteStageOfWork,
  addStageOfWork,
  addRemark,
};
