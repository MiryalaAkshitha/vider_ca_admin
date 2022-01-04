import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface DueDiligenceState {}

const initialState: DueDiligenceState = {};

export const dueDiligence = createSlice({
  name: "dueDiligence",
  initialState,
  reducers: {},
});

// export const {} = dueDiligence.actions;

export const selectDueDiligence = (state: RootState) => state.dueDiligence;

export default dueDiligence.reducer;
