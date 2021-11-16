import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobal {
  title: string;
  loading: boolean;
  taskItemsLoaded: boolean;
}

const initialState: IGlobal = {
  title: "",
  loading: false,
  taskItemsLoaded: false,
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
  },
});

export const selectGlobal = (state: RootState) => state.global;
export const selectTitle = (state: RootState) => state.global.title;

export const { updateTitle, setLoading, setTaskItemsLoaded } =
  globalClice.actions;

export default globalClice.reducer;
