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

const bulkDelete = ({ data }: any) => {
  return http.post(`/client/bulk-delete`, data);
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

const getLeads = (data: any) => {
  return http.get("/leads", data);
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
};
