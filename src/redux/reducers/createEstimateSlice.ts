import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface ParticularChangeType {
  index: number;
  key: string;
  value: any;
}

interface Address {
  legalName: string;
  buildingName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  mobileNumber: string;
}

interface Particular {
  name: string;
  hsn: string;
  units: number;
  rate: number;
  discountType: "PERCENT" | "AMOUNT";
  discount: number;
  amount: number;
  igst: any;
  cgst: any;
  sgst: any;
  taskId?: number;
}

interface OtherParticular {
  name: string;
  type: "ADDITIONAL" | "PURE_AGENT";
  amount: number;
}

interface BankDetails {
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  upiId: string;
  upiAttachment: string;
}

export interface IState {
  billingEntity: number | null;
  approvalHierarchy: any;
  client: string | null;
  placeOfSupply: string;
  estimateNumber: string;
  estimateDate: string | null;
  estimateDueDate: string | null;
  terms: string | null;
  billingEntityAddress: Address | null;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  particulars: Array<Particular>;
  otherParticulars: Array<OtherParticular>;
  bankDetails: BankDetails | null;
  termsAndConditions: Array<string>;
  tasks: Array<number>;
  adjustment: number;
  interState: boolean;
}

const initialState: IState = {
  billingEntity: null,
  billingEntityAddress: null,
  approvalHierarchy: null,
  client: null,
  placeOfSupply: "",
  estimateNumber: "",
  estimateDate: null,
  estimateDueDate: null,
  terms: null,
  shippingAddress: null,
  billingAddress: null,
  particulars: [],
  otherParticulars: [],
  bankDetails: null,
  termsAndConditions: [],
  tasks: [],
  adjustment: 0,
  interState: false,
};

export const createEstimateSlice = createSlice({
  name: "createEstimate",
  initialState,
  reducers: {
    handleFieldChange(state: IState, action: PayloadAction<any>) {
      state[action.payload.key] = action.payload.value;
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
      state.particulars.push({
        name: "",
        hsn: "",
        units: 1,
        rate: 0,
        discountType: "PERCENT",
        discount: 0,
        amount: 0,
        igst: null,
        cgst: null,
        sgst: null,
      });
    },
    handleRemoveParticular(state: IState, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(
        (task) => task !== state.particulars[action.payload].taskId
      );
      state.particulars.splice(action.payload, 1);
    },
    handleChangeParticular(
      state: IState,
      action: PayloadAction<ParticularChangeType>
    ) {
      state.particulars[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    handleAddOtherParticular(state: IState) {
      state.otherParticulars.push({
        name: "",
        type: "ADDITIONAL",
        amount: 0,
      });
    },
    handleRemoveOtherParticular(state: IState, action: PayloadAction<number>) {
      state.otherParticulars.splice(action.payload, 1);
    },
    handleChangeOtherParticular(
      state: IState,
      action: PayloadAction<ParticularChangeType>
    ) {
      state.otherParticulars[action.payload.index][action.payload.key] =
        action.payload.value;
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
      action.payload.forEach((task) => {
        state.particulars.push({
          name: task.name,
          hsn: "",
          units: 1,
          rate: +task?.feeAmount || 0,
          discountType: "PERCENT",
          discount: 0,
          amount: 0,
          igst: null,
          cgst: null,
          sgst: null,
          taskId: task.id,
        });
        task?.expenditure?.forEach((expenditure: any) => {
          state.otherParticulars.push({
            name: expenditure.particularName,
            type: expenditure.type,
            amount: +expenditure?.amount || 0,
          });
        });
        state.tasks.push(task.id);
      });
    },
    resetState(state: IState) {
      state.billingEntity = null;
      state.billingEntityAddress = null;
      state.approvalHierarchy = null;
      state.client = null;
      state.placeOfSupply = "";
      state.estimateNumber = "";
      state.estimateDate = null;
      state.estimateDueDate = null;
      state.terms = null;
      state.shippingAddress = null;
      state.billingAddress = null;
      state.particulars = [];
      state.otherParticulars = [];
      state.bankDetails = null;
      state.termsAndConditions = [];
      state.tasks = [];
      state.adjustment = 0;
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
