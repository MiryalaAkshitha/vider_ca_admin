import { http } from "api/http";

const createRoom = (data: any) => {
  return http.post("/chats/rooms", { members: data?.members });
};

const createGroup = (data: any) => {
  return http.post("/chats/groups", data);
};

const deleteChatroom = ({ id }) => {
  return http.delete(`/chats/rooms/${id}`);
};

const updateChatRoom = ({ id, data }) => {
  return http.patch(`/chats/rooms/${id}`, data);
};

const getChatRooms = ({ queryKey }) => {
  return http.get("/chats/rooms", { params: { type: queryKey[1] } });
};

const readMessages = ({ queryKey }) => {
  return http.post("/chats/messages/read", { roomId: queryKey[1] });
};

export {
  createRoom,
  getChatRooms,
  readMessages,
  createGroup,
  deleteChatroom,
  updateChatRoom,
};
