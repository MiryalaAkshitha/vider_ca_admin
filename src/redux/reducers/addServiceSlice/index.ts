import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IAddService } from "./types";

const initialState: IAddService = {
  name: "",
  description: "",
  category: null,
  subCategory: null,
  hourlyPrice: "",
  totalPrice: "",
  checklists: [],
  milestones: [],
  stageOfWork: [],
  subTasks: [],
};

export const addServiceSlice = createSlice({
  name: "addService",
  initialState,
  reducers: {
    setData: (state: IAddService, action) => {
      const { payload } = action;
      state.name = payload.name;
      state.description = payload.description || "";
      state.category = payload.category?.id || null;
      state.subCategory = payload.subCategory?.id || null;
      state.hourlyPrice = payload.hourlyPrice || "";
      state.totalPrice = payload.totalPrice || "";
      state.checklists = payload.checklists;
      state.milestones = payload.milestones;
      state.stageOfWork = payload.stageOfWorks;
      state.subTasks = payload.subTasks;
    },
    resetData: (state: IAddService) => {
      state.name = "";
      state.description = "";
      state.category = null;
      state.subCategory = null;
      state.hourlyPrice = "";
      state.totalPrice = "";
      state.checklists = [];
      state.milestones = [];
      state.stageOfWork = [];
      state.subTasks = [];
    },
    handleChange: (state: IAddService, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    addChecklist(state: IAddService, action) {
      state.checklists.push(action.payload);
    },
    updateChecklistName(state: IAddService, action) {
      state.checklists[action.payload.index].name = action.payload.name;
    },
    deleteChecklist(state: IAddService, action) {
      state.checklists.splice(action.payload, 1);
    },
    addChecklistItem(state: IAddService, action) {
      state.checklists[action.payload.index].checklistItems.push(
        ...action.payload.items
      );
    },
    deleteChecklistItem(state: IAddService, action) {
      state.checklists[action.payload.checklistIndex].checklistItems.splice(
        action.payload.itemIndex,
        1
      );
    },
    updateChecklistItem(state: IAddService, action) {
      const { itemIndex, checklistIndex, data } = action.payload;
      state.checklists[checklistIndex].checklistItems[itemIndex] = data;
    },
    addMilestone(state: IAddService, action) {
      state.milestones.push(action.payload);
    },
    updateMilestone(state: IAddService, action) {
      state.milestones[action.payload.index] = action.payload.data;
    },
    deleteMilestone(state: IAddService, action) {
      state.milestones.splice(action.payload, 1);
    },
    addStageOfWork(state: IAddService, action) {
      state.stageOfWork.push(action.payload);
    },
    updateStageOfWork(state: IAddService, action) {
      state.stageOfWork[action.payload.index] = action.payload.data;
    },
    deleteStageOfWork(state: IAddService, action) {
      state.stageOfWork.splice(action.payload, 1);
    },
    addSubTask(state: IAddService, action) {
      state.subTasks.push(action.payload);
    },
    updateSubTask(state: IAddService, action) {
      state.subTasks[action.payload.index] = action.payload.data;
    },
    deleteSubTask(state: IAddService, action) {
      state.subTasks.splice(action.payload, 1);
    },
  },
});

export const addServiceState = (state: RootState) => state.addService;

export const {
  addChecklist,
  addChecklistItem,
  updateChecklistName,
  deleteChecklist,
  deleteChecklistItem,
  updateChecklistItem,
  addMilestone,
  updateMilestone,
  deleteMilestone,
  addStageOfWork,
  updateStageOfWork,
  deleteStageOfWork,
  addSubTask,
  updateSubTask,
  deleteSubTask,
  handleChange,
  setData,
  resetData,
} = addServiceSlice.actions;

export default addServiceSlice.reducer;
