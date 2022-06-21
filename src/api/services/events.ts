import { http } from "api/http";

const createEvent = (data: any) => {
  return http.post("/events", data);
};

const updateEvent = ({ id, data }: any) => {
  return http.put(`/events/${id}`, data);
};

const deleteEvent = ({ id }: any) => {
  return http.delete(`/events/${id}`);
};

const getEvents = ({ queryKey }) => {
  return http.get("/events", { params: { ...queryKey[1] } });
};

const getDefaultEvents = () => {
  return http.get("/events/default");
};

export { getEvents, getDefaultEvents, createEvent, updateEvent, deleteEvent };
