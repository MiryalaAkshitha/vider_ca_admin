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

const updateClient = ({ data, clientId }: any) => {
  return http.put(`/client/${clientId}`, data);
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
};
