import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface IForms {
  activePage: number;
  addPageOpen: boolean;
  data: any;
}

const initialState: IForms = {
  activePage: 0,
  addPageOpen: false,
  data: null,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setFields(state, action) {
      state.data.pages[state.activePage].fields = action.payload;
    },
    setAddPageOpen(state, action) {
      state.addPageOpen = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    moveFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const fields = state.data.pages[state.activePage].fields;
      const field = fields[from];
      fields.splice(from, 1);
      fields.splice(to, 0, field);
      state.data.pages[state.activePage].fields = fields;
    },
    addField(state, action) {
      // const fields = state.data.pages[state.activePage].fields;
      // fields.splice(state.todoIndex, 0, action.payload);
      // state.data.pages[state.activePage].fields = fields;
    },
  },
});

export const selectForms = (state: RootState) => state.forms;

export const {
  setData,
  setAddPageOpen,
  setActivePage,
  moveFields,
  addField,
  setFields,
} = formsSlice.actions;

export default formsSlice.reducer;
