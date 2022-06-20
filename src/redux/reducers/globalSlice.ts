import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobal {
  title: string;
  loading: boolean;
  taskItemsLoaded: boolean;
  unreadMessages: number;
}

const initialState: IGlobal = {
  title: "",
  loading: false,
  taskItemsLoaded: false,
  unreadMessages: 0,
};

export const globalClice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateTitle(state, action) {
      state.title = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTaskItemsLoaded(state, action: PayloadAction<boolean>) {
      state.taskItemsLoaded = action.payload;
    },
    setUnreadMessages(state, action: PayloadAction<number>) {
      state.unreadMessages = action.payload;
    },
  },
});

export const selectGlobal = (state: RootState) => state.global;
export const selectTitle = (state: RootState) => state.global.title;

export const { updateTitle, setLoading, setTaskItemsLoaded } =
  globalClice.actions;

export default globalClice.reducer;
