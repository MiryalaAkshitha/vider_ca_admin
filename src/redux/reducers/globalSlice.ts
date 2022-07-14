import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobal {
  title: string;
  loading: boolean;
  taskItemsLoaded: boolean;
  unreadMessages: number;
  timerRunning: boolean;
}

const initialState: IGlobal = {
  title: "",
  loading: false,
  taskItemsLoaded: false,
  unreadMessages: 0,
  timerRunning: false,
};

export const globalClice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateTitle(state: IGlobal, action) {
      state.title = action.payload;
    },
    setGlobalLoading(state: IGlobal, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTaskItemsLoaded(state: IGlobal, action: PayloadAction<boolean>) {
      state.taskItemsLoaded = action.payload;
    },
    setUnreadMessages(state: IGlobal, action: PayloadAction<number>) {
      state.unreadMessages = action.payload;
    },
    setTimerRunning(state: IGlobal, action: PayloadAction<boolean>) {
      state.timerRunning = action.payload;
    },
  },
});

export const selectGlobal = (state: RootState) => state.global;
export const selectTitle = (state: RootState) => state.global.title;

export const {
  updateTitle,
  setGlobalLoading,
  setTaskItemsLoaded,
  setTimerRunning,
} = globalClice.actions;

export default globalClice.reducer;
