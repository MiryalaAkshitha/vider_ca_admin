import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MONTHS } from "utils/constants";

const QPERIODS = [
  "Q1(April - June)",
  "Q1(July - Sep)",
  "Q1(October - December)",
  "Q1(January - March)",
];

type Period = {
  period: string;
  startDate: string;
  endDate: string;
};

export interface IAddService {
  serviceType: string;
  documents: string[];
  deliverables: string[];
  recurring: boolean;
  frequency: string;
  frequency_periods: Array<Period>;
}

const initialState: IAddService = {
  serviceType: "",
  documents: [""],
  deliverables: [""],
  recurring: false,
  frequency: "",
  frequency_periods: [],
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
    updateServiceType(state, action) {
      if (action.payload == "Recurring service") {
        state.recurring = true;
      } else {
        state.recurring = false;
      }
    },
    updateFrequency(state, action) {
      state.frequency = action.payload;
      if (action.payload == "Monthly") {
        state.frequency_periods = MONTHS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
      if (action.payload == "Quarterly") {
        state.frequency_periods = QPERIODS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
    },
  },
});

export const selectDocuments = (state: RootState) => state.addservice.documents;
export const addServiceState = (state: RootState) => state.addservice;
export const selectFrequencyPeriods = (state: RootState) =>
  state.addservice.frequency_periods;
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
  updateServiceType,
  updateFrequency,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
