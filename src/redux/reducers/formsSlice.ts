import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface IForms {
  activePage: number;
  addPageOpen: boolean;
  data: any;
  addedIndex: number | null;
  todoIndex: number | null;
  focused: number | null;
}

const initialState: IForms = {
  activePage: 0,
  addPageOpen: false,
  data: null,
  addedIndex: null,
  todoIndex: null,
  focused: null,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
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
    setTodoIndex(state, action: PayloadAction<number>) {
      state.todoIndex = action.payload;
    },
    addField(state, action) {
      const fields = state.data.pages[state.activePage].fields;
      fields.splice(state.todoIndex, 0, action.payload);
      state.data.pages[state.activePage].fields = fields;
    },
    setFocused(state, action: PayloadAction<number | null>) {
      state.focused = action.payload;
    },
  },
});

export const selectForms = (state: RootState) => state.forms;

export const {
  setData,
  setAddPageOpen,
  setActivePage,
  moveFields,
  setTodoIndex,
  addField,
  setFocused,
} = formsSlice.actions;

export default formsSlice.reducer;
