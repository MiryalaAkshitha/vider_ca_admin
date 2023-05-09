import { http } from "api/http";

const createClient = (data: any) => {
  console.log('1');
  return http.post("/client", data);
};

const getClients = ({ queryKey }: any) => {
  let { limit, offset, query } = queryKey[1] || {};
  return http.get("/client", {
    params: {
      limit,
      offset,
      ...query,
    },
  });
};

const getClient = ({ queryKey }: any) => {
  return http.get(`/client/${queryKey[1]}/details`);
};

const updateClient = ({ data, id }: any) => {
  return http.patch(`/client/${id}/update`, data);
};

const createContactPerson = (data: any) => {
  return http.post("/contact-persons", data);
};

const updateContactPerson = ({ id, data }: { data: any; id: any }) => {
  return http.put(`/contact-persons/${id}`, data);
};

const deleteContactPerson = (id: any) => {
  return http.delete(`/contact-persons/${id}`);
};

const importClients = (data: FormData) => {
  return http.post(`/client/import`, data);
};

const bulkDelete = ({ ids }: any) => {
  return http.post(`/client/bulk-delete`, { ids });
};

const bulkUpdate = ({ ids, data }: any) => {
  return http.patch(`/client/bulk-update`, { ids, ...data });
};

const createLead = (data: any) => {
  return http.post("/leads", data);
};

const updateLead = ({ id, data }) => {
  return http.put(`/leads/${id}`, data);
};

const deleteLeads = (ids: number[]) => {
  return http.post(`/leads/delete`, { ids });
};

const getLeads = ({ queryKey }) => {
  return http.get("/leads", { params: { ...queryKey[1] } });
};

const getCompletedTasks = ({ queryKey }) => {
  return http.get(`/tasks/completed-tasks`, {
    params: {
      clientId: queryKey[1].clientId,
    },
  });
};

const getUserCompletedTasks = ({ queryKey }) => {
  return http.get(`/tasks/user-completed-tasks`, {
    params: {
      userId: queryKey[1].userId,
    },
  });
};

const getDeletedTasks = ({ queryKey }) => {
  return http.get(`/tasks/deleted-tasks`, {
    params: {
      clientId: queryKey[1]?.clientId,
    },
  });
};

const getTerminatedTasks = ({ queryKey }) => {
  return http.get(`/tasks/terminated-tasks`, {
    params: {
      clientId: queryKey[1].clientId,
    },
  });
};

const getDeletedClients = () => {
  return http.get("/client/deleted");
};

const restoreClient = (id: number) => {
  return http.post(`/client/${id}/restore`);
};

const restoreTask = (id: number) => {
  return http.post(`/tasks/${id}/restore`);
};

export {
  createClient,
  getClients,
  getClient,
  updateClient,
  createContactPerson,
  updateContactPerson,
  deleteContactPerson,
  importClients,
  bulkDelete,
  bulkUpdate,
  createLead,
  getLeads,
  updateLead,
  deleteLeads,
  getTerminatedTasks,
  getUserCompletedTasks,
  getCompletedTasks,
  getDeletedTasks,
  getDeletedClients,
  restoreClient,
  restoreTask
};