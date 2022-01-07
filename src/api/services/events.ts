import { http } from "api/http";

const createEvent = (data: any) => {
  return http.post("/events", data);
};

const getEvents = () => {
  return http.get("/events");
};

export { getEvents, createEvent };
