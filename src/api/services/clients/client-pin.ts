import { http } from "api/http";

const getPins = () => {
  return http.get(`/client-pins`);
};

const addPin = ({ client }: { client: number }) => {
  return http.post(`/client-pins`, { client });
};

const removePin = (id: number) => {
  return http.delete(`/client-pins/${id}`);
};

export { getPins, addPin, removePin };
