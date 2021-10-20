import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobal {
  title: string;
  loading: boolean;
}

const initialState: IGlobal = {
  title: "",
  loading: false,
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
  },
});

export const selectTitle = (state: RootState) => state.global.title;

export const { updateTitle, setLoading } = globalClice.actions;

export default globalClice.reducer;
