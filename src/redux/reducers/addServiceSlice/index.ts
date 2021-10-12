import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import {
  HPERIODS,
  INITIAL_MILESTONES,
  MONTHS,
  QPERIODS,
  YPERIODS,
} from "utils/constants";
import { v4 as uuidv4 } from "uuid";
import {
  AddAccordionContent,
  DeleteChecklistItem,
  IAddService,
  UpdateChecklistItem,
  UpdateDate,
  UpdateFrequencyPayload,
  UpdateMileStoneName,
} from "./types";

const initialState: IAddService = {
  serviceType: "",
  documents: [""],
  deliverables: [""],
  recurring: false,
  frequency: "",
  frequencyPeriods: [],
  mileStones: [...INITIAL_MILESTONES],
  description: [],
  repeated: false,
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
      state.repeated = false;
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
    repeateStartAndEndDates(state) {
      if (state.repeated) {
        return;
      }

      let startDatesUpdated: boolean = false;
      let endDatesUpdated: boolean = false;

      let updateDatesForRemaining = ({ index, type, date }: UpdateDate) => {
        for (let i = index; i <= state.frequencyPeriods.length - 1; i++) {
          state.frequencyPeriods[i][type] =
            date.split(",")[0] + ", " + state.frequencyPeriods[i].period;
        }
      };

      for (let i = state.frequencyPeriods.length - 1; i >= 0; i--) {
        let existingStartDate = state.frequencyPeriods[i].startDate;
        let existingEndDate = state.frequencyPeriods[i].endDate;

        if (existingStartDate && !startDatesUpdated) {
          updateDatesForRemaining({
            index: i,
            type: "startDate",
            date: existingStartDate,
          });
          startDatesUpdated = true;
        }

        if (existingEndDate && !endDatesUpdated) {
          updateDatesForRemaining({
            index: i,
            type: "endDate",
            date: existingEndDate,
          });
          endDatesUpdated = true;
        }
      }
      state.repeated = true;
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
        id: uuidv4(),
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
    reArrangeMilestones(state, action) {
      state.mileStones = action.payload;
    },
    addContentBlock(state, action: PayloadAction<string>) {
      state.description.push({
        title: action.payload,
        id: uuidv4(),
        items: [],
      });
    },
    addTextContent(state, action: PayloadAction<{ index: number }>) {
      let contentBlockIndex = action.payload.index;
      state.description[contentBlockIndex].items.push({
        type: "text",
        id: uuidv4(),
        description: "",
        items: [],
      });
    },
    addAccordionContent(state, action: PayloadAction<AddAccordionContent>) {
      let contentBlockIndex = action.payload.index;
      state.description[contentBlockIndex].items.push({
        type: "accordion",
        id: uuidv4(),
        description: "",
        items: [
          {
            ...action.payload.data,
            id: uuidv4(),
            items: [],
          },
        ],
      });
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
  repeateStartAndEndDates,
  reArrangeMilestones,
  addContentBlock,
  addTextContent,
  addAccordionContent,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
