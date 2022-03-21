import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  amount: number;
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
  shippingAddress: Address | null;
  billingAddress: Address | null;
  particulars: Array<Particular>;
  otherParticulars: Array<OtherParticular>;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankIfscCode: string | null;
  bankBranch: string | null;
  termsAndConditions: Array<string>;
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
};

export const createInvoiceSlice = createSlice({
  name: "createInvoice",
  initialState,
  reducers: {
    handleChange(
      state,
      action: PayloadAction<{ key: string; value: string | null }>
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
        igstPercent: 5,
        cgstPercent: 0,
        sgstPercent: 0,
        amount: 0,
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
  },
});

export const selectInvoice = (state: RootState) => state.createInvoice;

export const getTaxableAmount = (particular) => {
  let result = particular.units * particular.rate;
  if (particular.discountType === "PERCENT") {
    result = result - (result * particular.discount) / 100;
  }

  if (particular.discountType === "AMOUNT") {
    result = result - particular.discount;
  }

  return result;
};

export const getIgstAmount = (particular) => {
  const taxableAmount = getTaxableAmount(particular);
  return (taxableAmount * particular.igstPercent) / 100;
};

export const getAmount = (particular) => {
  const taxableAmount = getTaxableAmount(particular);
  const igstAmount = getIgstAmount(particular);
  return taxableAmount + igstAmount;
};

export const totalTaxableValue = (particulars) => {
  return particulars.reduce(
    (acc, particular) => acc + getTaxableAmount(particular),
    0
  );
};

export const totalIgstValue = (particulars) => {
  return particulars.reduce(
    (acc, particular) => acc + getIgstAmount(particular),
    0
  );
};

export const totalAmount = (particulars) => {
  return totalTaxableValue(particulars) + totalIgstValue(particulars);
};

export const totalOtherParticularsAmount = (particulars) => {
  return particulars.reduce((acc, particular) => acc + particular.amount, 0);
};

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
} = createInvoiceSlice.actions;

export default createInvoiceSlice.reducer;
