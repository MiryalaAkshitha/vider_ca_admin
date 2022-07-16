import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface IState {
  chatType: string;
  name: string;
  image: string;
  type: string;
  roomId: string | null;
  messages: any[];
  members: any[];
}

const initialState: IState = {
  chatType: "",
  name: "",
  image: "",
  type: "",
  roomId: null,
  messages: [],
  members: [],
};

export const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatData(state: IState, action: PayloadAction<any>) {
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.type = action.payload.type;
      state.roomId = action.payload.roomId;
      state.messages = action.payload.messages;
      state.members = action.payload.members;
    },
    addMessage(state: IState, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
    setChatType(state: IState, action: PayloadAction<any>) {
      state.chatType = action.payload;
    },
  },
});

export const selectChats = (state: RootState) => state.chats;

export const { setChatData, addMessage, setChatType } = ChatsSlice.actions;

export default ChatsSlice.reducer;
