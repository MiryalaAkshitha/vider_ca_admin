import { http } from "api/http";

const createClient = (data: any) => {
  return http.post("/client", data);
};

const getClients = ({ queryKey }: any) => {
  let { limit, offset, query } = queryKey[1];
  return http.get("/client", {
    params: {
      limit,
      offset,
      ...query,
    },
  });
};

const getClient = ({ queryKey }: any) => {
  return http.get(`/client/${queryKey[1]}`);
};

const updateClient = ({ data, id }: any) => {
  return http.put(`/client/${id}`, data);
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

const createLead = (data: any) => {
  return http.post("/leads", data);
};

const updateLead = ({ id, data }) => {
  return http.put(`/leads/${id}`, data);
};

const deleteLead = (id: number) => {
  return http.delete(`/leads/${id}`);
};

const getLeads = ({ queryKey }) => {
  return http.get("/leads", { params: { ...queryKey[1] } });
};

const getDscRegisters = ({ queryKey }) => {
  return http.get("/dsc-register", { params: { ...queryKey[1] } });
};

const createDscRegister = (data: any) => {
  return http.post("/dsc-register", data);
};

const updateDscRegister = ({ id, data }: any) => {
  return http.put(`/dsc-register/${id}`, data);
};

const deleteDscRegister = (id: number) => {
  return http.delete(`/dsc-register/${id}`);
};

const getDscRegister = ({ queryKey }) => {
  return http.get("/dsc-register/details", { params: { ...queryKey[1] } });
};

const issueOrReceiveDsc = ({ id, data }: any) => {
  return http.post(`/dsc-register/${id}/issue-receive`, data);
};

const getCompletedTasks = ({ queryKey }) => {
  return http.get(`/tasks/completed-tasks`, {
    params: {
      clientId: queryKey[1].clientId,
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
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  getDscRegisters,
  createDscRegister,
  updateDscRegister,
  deleteDscRegister,
  getDscRegister,
  issueOrReceiveDsc,
  getTerminatedTasks,
  getCompletedTasks,
};
