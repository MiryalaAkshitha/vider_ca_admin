import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface IForms {
  activePage: number;
  addPageOpen: boolean;
  editPageOpen: boolean;
  data: any;
  validations: any;
  focused: string | null;
}

const initialState: IForms = {
  activePage: 0,
  addPageOpen: false,
  editPageOpen: false,
  data: null,
  focused: null,
  validations: null,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setValidations(state, action) {
      state.validations = action.payload;
    },
    setFields(state, action) {
      state.data.pages[state.activePage].fields = action.payload;
    },
    setAddPageOpen(state, action) {
      state.addPageOpen = action.payload;
    },
    setEditPageOpen(state, action) {
      state.editPageOpen = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setFocused(state, action) {
      state.focused = action.payload;
    },
    moveFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const fields = state.data.pages[state.activePage].fields;
      const field = fields[from];
      fields.splice(from, 1);
      fields.splice(to, 0, field);
      state.data.pages[state.activePage].fields = fields;
    },
  },
});

export const selectForms = (state: RootState) => state.forms;

export const {
  setData,
  setAddPageOpen,
  setActivePage,
  moveFields,
  setFields,
  setFocused,
  setEditPageOpen,
  setValidations,
} = formsSlice.actions;

export default formsSlice.reducer;
