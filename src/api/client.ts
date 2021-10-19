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

export { createClient, getClients };
