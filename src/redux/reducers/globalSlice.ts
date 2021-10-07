import { RootState } from "redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface IGlobal {
  title: string;
}

const initialState: IGlobal = {
  title: "",
};

export const globalClice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const selectTitle = (state: RootState) => state.global.title;

export const { updateTitle } = globalClice.actions;

export default globalClice.reducer;
