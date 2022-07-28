import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "redux/store";
import {
  initialParticular,
  initialState,
  IState,
  ParticularChangeType,
} from "./types";
import { getEstimatedDueDate } from "./utils";

export const createEstimateSlice = createSlice({
  name: "createEstimate",
  initialState: _.cloneDeep(initialState),
  reducers: {
    resetState(state: IState) {
      let stateCopy = _.cloneDeep(initialState);
      Object.keys(stateCopy).forEach((key) => {
        state[key] = stateCopy[key];
      });
    },
    handleFieldChange(state: IState, action: PayloadAction<any>) {
      const { key, value } = action.payload;
      state[key] = value;
      if (key === "terms") {
        state.estimateDueDate = getEstimatedDueDate(value, state.estimateDate);
      }
    },
    handlePlaceOfSupplyChange(state: IState, action: PayloadAction<any>) {
      state.placeOfSupply = action.payload;
      state.interState = action.payload === state.billingEntityAddress?.state;
    },
    handleBillingEntityChange(
      state: IState,
      action: PayloadAction<{ billingEntity: any }>
    ) {
      let billEntity = action.payload.billingEntity;
      state.billingEntity = billEntity?.id;
      let address = {
        legalName: billEntity?.legalName,
        buildingName: billEntity?.buildingName,
        street: billEntity?.street,
        city: billEntity?.city,
        state: billEntity?.state,
        pincode: billEntity?.pincode,
        email: billEntity?.email,
        mobileNumber: billEntity?.mobileNumber,
      };
      state.billingEntityAddress = address;
      state.interState = state.placeOfSupply === billEntity?.state;
    },
    handleApprovalChange(state: IState, action: PayloadAction<any>) {
      state.approvalHierarchy = action.payload;
    },
    handleClientChange(state: IState, action: PayloadAction<{ client: any }>) {
      let client = action.payload.client;
      state.client = client?.id;
      let address = {
        legalName: client?.legalName,
        buildingName: client?.buildingName,
        street: client?.street,
        city: client?.city,
        state: client?.state,
        pincode: client?.pincode,
        gstTreatment: "",
        gstIn: client?.gstIn,
        email: client?.email,
        mobileNumber: client?.mobileNumber,
      };
      state.shippingAddress = address;
      state.billingAddress = address;
    },
    handleBankDetailsChange(state: IState, action: PayloadAction<any>) {
      const data = action.payload;
      state.bankDetails = {
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        branchName: data.branchName,
        ifscCode: data.ifscCode,
        upiId: data.upiId,
        upiAttachment: data.upiAttachmentUrl,
      };
    },
    handleAddParticular(state: IState) {
      state.particulars.push({ ...initialParticular });
    },
    handleRemoveParticular(state: IState, action: PayloadAction<number>) {
      state.particulars.splice(action.payload, 1);
    },
    handleChangeParticular(
      state: IState,
      action: PayloadAction<ParticularChangeType>
    ) {
      const { index, key, value } = action.payload;
      state.particulars[index][key] = value;
    },
    handleAddOtherParticular(state: IState) {
      state.otherParticulars.push({ name: "", amount: 0 });
    },
    handleRemoveOtherParticular(state: IState, action: PayloadAction<number>) {
      state.otherParticulars.splice(action.payload, 1);
    },
    handleChangeOtherParticular(
      state: IState,
      action: PayloadAction<ParticularChangeType>
    ) {
      const { index, key, value } = action.payload;
      state.otherParticulars[index][key] = value;
    },
    handleAddTermsAndConditions(state: IState, action: PayloadAction<string>) {
      state.termsAndConditions.push(action.payload);
    },
    handleRemoveTermsAndConditions(
      state: IState,
      action: PayloadAction<number>
    ) {
      state.termsAndConditions.splice(action.payload, 1);
    },
    handleUpdateTermsAndConditions(state: IState, action) {
      state.termsAndConditions = action.payload;
    },
    handleAddTasksToParticular(state: IState, action: PayloadAction<any[]>) {
      for (let task of action.payload) {
        state.particulars.push({
          ...initialParticular,
          name: task.name,
          rate: +task?.feeAmount || 0,
          taskId: task.id,
        });
        let additional = _.filter(task?.expenditure, { type: "ADDITIONAL" });
        let pureAgent = _.filter(task?.expenditure, { type: "PURE_AGENT" });
        additional.forEach((expenditure: any) => {
          state.particulars.push({
            ...initialParticular,
            rate: +expenditure?.amount || 0,
            name: expenditure.particularName,
            taskId: task.id,
          });
        });
        pureAgent.forEach((expenditure: any) => {
          state.otherParticulars.push({
            name: expenditure.particularName,
            amount: +expenditure?.amount || 0,
          });
        });
      }
    },
  },
});

export const selectEstimate = (state: RootState) => state.createEstimate;

export const {
  handleFieldChange,
  handleBillingEntityChange,
  handleApprovalChange,
  handleAddParticular,
  handleRemoveParticular,
  handleChangeParticular,
  handleBankDetailsChange,
  handleAddTermsAndConditions,
  handleRemoveTermsAndConditions,
  handleUpdateTermsAndConditions,
  handleAddOtherParticular,
  handleRemoveOtherParticular,
  handleChangeOtherParticular,
  handleClientChange,
  handleAddTasksToParticular,
  handlePlaceOfSupplyChange,
  resetState,
} = createEstimateSlice.actions;

export default createEstimateSlice.reducer;
