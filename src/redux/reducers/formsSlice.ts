import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobal {
  addedFields: Array<{ field: any; isRequired: boolean }>;
}

type ToggleRequiredPayload = {
  index: number;
  value: boolean;
};

const initialState: IGlobal = {
  addedFields: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setFields(state, action) {
      state.addedFields = action.payload;
    },
    addField(state, action) {
      state.addedFields.push({ field: action.payload, isRequired: false });
    },
    removeField(state, action) {
      state.addedFields.splice(action.payload.index, 1);
    },
    toggleRequired(state, action: PayloadAction<ToggleRequiredPayload>) {
      state.addedFields[action.payload.index].isRequired = action.payload.value;
    },
  },
});

export const selectForm = (state: RootState) => state.forms;

export const { addField, removeField, setFields, toggleRequired } =
  formsSlice.actions;

export default formsSlice.reducer;
