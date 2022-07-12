import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IApprovalLevel {
  roleId: string;
  userId: string;
}

export interface IState {
  name: string;
  type: string;
  approvalLevels: Array<IApprovalLevel>;
}

const initialState: IState = {
  name: "",
  type: "",
  approvalLevels: [],
};

export const approvalsSlice = createSlice({
  name: "approvals",
  initialState,
  reducers: {
    setData(state: IState, action: PayloadAction<any>) {
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.approvalLevels = action.payload.approvalLevels;
    },
    resetData(state: IState) {
      state.name = "";
      state.type = "";
      state.approvalLevels = [];
    },
    handleApprovalName(state: IState, action: PayloadAction<any>) {
      state.name = action.payload;
    },
    handleApprovalType(state: IState, action: PayloadAction<any>) {
      state.type = action.payload;
    },
    addApprovalLevel(state: IState) {
      state.approvalLevels.push({ roleId: "", userId: "" });
    },
    removeApprovalLevel(state: IState, action: PayloadAction<number>) {
      state.approvalLevels.splice(action.payload, 1);
    },
    handleApprovalLevel(state: IState, action: PayloadAction<any>) {
      let { index, name, value } = action.payload;
      state.approvalLevels[index][name] = value;
    },
  },
});

export const selectApprovals = (state: RootState) => state.approvals;

export const {
  handleApprovalName,
  handleApprovalType,
  addApprovalLevel,
  setData,
  resetData,
  handleApprovalLevel,
  removeApprovalLevel,
} = approvalsSlice.actions;

export default approvalsSlice.reducer;
