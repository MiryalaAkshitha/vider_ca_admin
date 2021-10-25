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
const getOneClient = ({ queryKey }) => http.get(`/client/${queryKey[1]}`);
const updateClient = ({ data, clientId }: any) =>
  http.put(`/client/${clientId}`, data);

export { createClient, getClients, getOneClient, updateClient };
