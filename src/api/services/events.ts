import { http } from "api/http";

const createEvent = (data: any) => {
  return http.post("/events", data);
};

const getEvents = ({ queryKey }) => {
  return http.get("/events", { params: { ...queryKey[1] } });
};

export { getEvents, createEvent };
