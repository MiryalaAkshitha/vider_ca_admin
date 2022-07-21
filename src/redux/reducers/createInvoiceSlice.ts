import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface Address {
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstTreatment: string;
  gstIn: string;
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

export interface ICreateInvoice {
  client: string | null;
  invoiceDate: string | null;
  invoiceDueDate: string | null;
  terms: string | null;
  shippingAddress: Address;
  billingAddress: Address;
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

const initialState: ICreateInvoice = {
  client: null,
  invoiceDate: null,
  invoiceDueDate: null,
  terms: null,
  shippingAddress: {
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstTreatment: "",
    gstIn: "",
    email: "",
    mobileNumber: "",
  },
  billingAddress: {
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstTreatment: "",
    gstIn: "",
    email: "",
    mobileNumber: "",
  },
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

type AddressChangeType = {
  key: string;
  value: string;
  type: "billing" | "shipping";
};

export const createInvoiceSlice = createSlice({
  name: "createInvoice",
  initialState,
  reducers: {
    handleChange(
      state,
      action: PayloadAction<{ key: string; value: string | number | null }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    handleClientChange(state, action: PayloadAction<{ client: any }>) {
      let client = action.payload.client;
      state.client = client?.id;
      let address = {
        businessName: client?.tradeName,
        address: client?.address,
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
    handleBankDetailsChange(state, action) {
      state.bankName = action.payload.bankName;
      state.bankAccountNumber = action.payload.bankAccountNumber;
      state.bankIfscCode = action.payload.bankIfscCode;
      state.bankBranch = action.payload.bankBranch;
    },
    handleAddParticular(state) {
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
    handleRemoveParticular(state, action: PayloadAction<number>) {
      state.particulars.splice(action.payload, 1);
    },
    handleChangeParticular(
      state,
      action: PayloadAction<{
        index: number;
        key: string;
        value: string | number | null;
      }>
    ) {
      state.particulars[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    handleAddOtherParticular(state) {
      state.otherParticulars.push({
        name: "",
        type: "ADDITIONAL",
        amount: 0,
      });
    },
    handleRemoveOtherParticular(state, action: PayloadAction<number>) {
      state.otherParticulars.splice(action.payload, 1);
    },
    handleChangeOtherParticular(
      state,
      action: PayloadAction<{
        index: number;
        key: string;
        value: string | number | null;
      }>
    ) {
      state.otherParticulars[action.payload.index][action.payload.key] =
        action.payload.value;
    },
    handleAddTermsAndConditions(state, action: PayloadAction<string>) {
      state.termsAndConditions.push(action.payload);
    },
    handleRemoveTermsAndConditions(state, action: PayloadAction<number>) {
      state.termsAndConditions.splice(action.payload, 1);
    },
    handleUpdateTermsAndConditions(state, action) {
      state.termsAndConditions = action.payload;
    },
    handleAddTasksToParticular(state, action: PayloadAction<any[]>) {
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
    handleAddressChange(state, action: PayloadAction<AddressChangeType>) {
      const { key, value, type } = action.payload;
      if (type === "billing") {
        state.billingAddress[key] = value;
      }
      if (type === "shipping") {
        state.shippingAddress[key] = value;
      }
    },
  },
});

export const selectInvoice = (state: RootState) => state.createInvoice;

export const {
  handleChange,
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
  handleAddressChange,
} = createInvoiceSlice.actions;

export default createInvoiceSlice.reducer;
