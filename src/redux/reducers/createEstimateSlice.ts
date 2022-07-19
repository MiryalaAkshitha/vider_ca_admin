import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const particularsHeadings = [
  "Particulars (Task / Service name)",
  "HSN / SAC",
  "Units",
  "Rate",
  "Discount",
  "Taxable amount",
  "IGST",
  "Amount",
];

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
  taxableAmount: number;
  igstPercent: null | number;
  cgstPercent: null | number;
  sgstPercent: null | number;
}

interface OtherParticular {
  name: string;
  type: "ADDITIONAL" | "PURE_AGENT";
  amount: number;
}

export interface IState {
  billingEntity: number | null;
  approvalHierarchy: any;
  client: string | null;
  placeOfSupply: string;
  invoiceDate: string | null;
  invoiceDueDate: string | null;
  terms: string | null;
  billingEntityAddress: Address | null;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  particulars: Array<Particular>;
  otherParticulars: Array<OtherParticular>;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankIfscCode: string | null;
  bankBranch: string | null;
  termsAndConditions: Array<string>;
  tasks: Array<number>;
  tdsPercent: number;
  otherCharges: number;
  roundOff: string;
}

const initialState: IState = {
  billingEntity: null,
  approvalHierarchy: null,
  client: null,
  placeOfSupply: "",
  invoiceDate: null,
  invoiceDueDate: null,
  terms: null,
  shippingAddress: null,
  billingAddress: null,
  billingEntityAddress: null,
  particulars: [],
  otherParticulars: [],
  bankName: null,
  bankAccountNumber: null,
  bankIfscCode: null,
  bankBranch: null,
  termsAndConditions: [],
  tasks: [],
  tdsPercent: 0,
  otherCharges: 0,
  roundOff: "",
};

export const createEstimateSlice = createSlice({
  name: "createEstimate",
  initialState,
  reducers: {
    handleFieldChange(state: IState, action: PayloadAction<any>) {
      state[action.payload.key] = action.payload.value;
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
    handleBankDetailsChange(state: IState, action) {
      state.bankName = action.payload.bankName;
      state.bankAccountNumber = action.payload.bankAccountNumber;
      state.bankIfscCode = action.payload.bankIfscCode;
      state.bankBranch = action.payload.bankBranch;
    },
    handleAddParticular(state: IState) {
      state.particulars.push({
        name: "",
        hsn: "",
        units: 1,
        rate: 0,
        discountType: "PERCENT",
        discount: 0,
        taxableAmount: 0,
        igstPercent: 0,
        cgstPercent: 0,
        sgstPercent: 0,
      });
    },
    handleRemoveParticular(state: IState, action: PayloadAction<number>) {
      state.particulars.splice(action.payload, 1);
    },
    handleChangeParticular(
      state: IState,
      action: PayloadAction<{
        index: number;
        key: string;
        value: string | number | null;
      }>
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
      action: PayloadAction<{
        index: number;
        key: string;
        value: string | number | null;
      }>
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
          taxableAmount: 0,
          igstPercent: 0,
          cgstPercent: 0,
          sgstPercent: 0,
        });
        task?.expenditure?.forEach((expenditure) => {
          state.otherParticulars.push({
            name: expenditure.particularName,
            type: expenditure.type,
            amount: +expenditure?.amount || 0,
          });
        });
        state.tasks.push(task.id);
      });
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
} = createEstimateSlice.actions;

export default createEstimateSlice.reducer;
