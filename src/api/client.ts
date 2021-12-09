import { http } from "api/http";

const createClient = (data: any) => http.post("/client", data);
const getClients = ({ queryKey }) => {
  let { limit, offset, query } = queryKey[1];
  return http.get("/client", {
    params: {
      limit,
      offset,
      ...query,
    },
  });
};

const getClient = ({ queryKey }) => {
  return http.get(`/client/${queryKey[1]}`);
};

const updateClient = ({ data, clientId }: any) =>
  http.put(`/client/${clientId}`, data);
const createContactPerson = (data: any) => http.post("/contact-persons", data);
const updateContactPerson = ({ id, data }: { data: any; id: any }) => {
  return http.put(`/contact-persons/${id}`, data);
};
const deleteContactPerson = (id: any) => {
  return http.delete(`/contact-persons/${id}`);
};

export {
  createClient,
  getClients,
  getClient,
  updateClient,
  createContactPerson,
  updateContactPerson,
  deleteContactPerson,
};
