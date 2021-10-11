import {
  DeleteChecklistItem,
  IAddService,
  UpdateChecklistItem,
  UpdateFrequencyPayload,
  UpdateMileStoneName,
} from "./types";
import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MONTHS,
  QPERIODS,
  HPERIODS,
  YPERIODS,
  INITIAL_MILESTONES,
} from "utils/constants";

const initialState: IAddService = {
  serviceType: "",
  documents: [""],
  deliverables: [""],
  recurring: false,
  frequency: "",
  frequencyPeriods: [],
  mileStones: [...INITIAL_MILESTONES],
  description: [],
};

export const addServiceSlice = createSlice({
  name: "addService",
  initialState,
  reducers: {
    addDocument(state) {
      state.documents.push("");
    },
    updateServiceType(state, action) {
      if (action.payload === "Recurring service") {
        state.recurring = true;
      } else {
        state.recurring = false;
      }
    },
    updateFrequency(state, action) {
      state.frequency = action.payload;
      if (action.payload === "Monthly") {
        state.frequencyPeriods = MONTHS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
      if (action.payload === "Quarterly") {
        state.frequencyPeriods = QPERIODS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
      if (action.payload === "Half-Yearly") {
        state.frequencyPeriods = HPERIODS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
      if (action.payload === "Yearly") {
        state.frequencyPeriods = YPERIODS.map((item) => ({
          period: item,
          startDate: "",
          endDate: "",
        }));
      }
    },
    updateFrequencyDate(state, action: PayloadAction<UpdateFrequencyPayload>) {
      const { index, name, value } = action.payload;
      state.frequencyPeriods[index][name] = value;
    },
    updateMilestoneName(state, action: PayloadAction<UpdateMileStoneName>) {
      state.mileStones[action.payload.index].name = action.payload.value;
    },
    addMilestone(state) {
      state.mileStones.push({
        name: "",
        checklist: [],
      });
    },
    deleteMilestone(state, action: PayloadAction<number>) {
      state.mileStones.splice(action.payload, 1);
    },
    addMilestoneChecklistItem(state, action: PayloadAction<number>) {
      state.mileStones[action.payload].checklist.push("");
    },
    updateChecklistItemName(state, action: PayloadAction<UpdateChecklistItem>) {
      const { index, cIndex, value } = action.payload;
      state.mileStones[index].checklist[cIndex] = value;
    },
    deleteMilestoneChecklistItem(
      state,
      action: PayloadAction<DeleteChecklistItem>
    ) {
      let { mIndex, cIndex } = action.payload;
      state.mileStones[mIndex].checklist.splice(cIndex, 1);
    },
  },
});

export const addServiceState = (state: RootState) => state.addservice;

export const {
  addDocument,
  updateServiceType,
  updateFrequency,
  updateFrequencyDate,
  updateMilestoneName,
  addMilestone,
  deleteMilestone,
  addMilestoneChecklistItem,
  deleteMilestoneChecklistItem,
  updateChecklistItemName,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
