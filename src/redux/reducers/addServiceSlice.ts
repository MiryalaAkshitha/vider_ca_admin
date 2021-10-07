import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAddService {
  serviceType: string;
  documents: string[];
  deliverables: string[];
}

const initialState: IAddService = {
  serviceType: "",
  documents: [""],
  deliverables: [""],
};

export const addServiceSlice = createSlice({
  name: "addService",
  initialState,
  reducers: {
    updateValue(state, action) {},
    addDocument(state) {
      state.documents.push("");
    },
    updateDocument(
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) {
      state.documents[action.payload.index] = action.payload.value;
    },
    deleteDocument(state, action: PayloadAction<number>) {
      state.documents.splice(action.payload, 1);
    },
    addDeliverable(state) {
      state.deliverables.push("");
    },
    updateDeliverable(
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) {
      state.deliverables[action.payload.index] = action.payload.value;
    },
    deleteDeliverable(state, action: PayloadAction<number>) {
      state.deliverables.splice(action.payload, 1);
    },
  },
});

export const selectDocuments = (state: RootState) => state.addservice.documents;
export const selectDeliverables = (state: RootState) =>
  state.addservice.deliverables;

export const {
  updateValue,
  addDocument,
  updateDocument,
  deleteDocument,
  addDeliverable,
  updateDeliverable,
  deleteDeliverable,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
