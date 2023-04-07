import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "redux/store";

export interface IState {
  receiptNumber: string;
  receiptDate: string;
  client: number | null;
  type: "INVOICE" | "TASK" | "ADVANCE";
  amount: number;
  previousCredits: number;
  paymentMode: "CASH" | "CREDIT_CARD" | "CHEQUE" | "BANK_TRANSFER" | "UPI";
  paymentDate: string;
  referenceNumber: string;
  tds: string;
  tdsAmount: number;
  creditsUsed: number;
  particulars: Array<any>;
}

const initialState: IState = {
  receiptNumber: "",
  receiptDate: "",
  client: null,
  type: "INVOICE",
  particulars: [],
  amount: 0,
  previousCredits: 0,
  paymentMode: "CASH",
  paymentDate: "",
  referenceNumber: "",
  tds: "",
  tdsAmount: 0,
  creditsUsed: 0,
};

export const createReceiptSlice = createSlice({
  name: "createReceipt",
  initialState: _.cloneDeep(initialState),
  reducers: {
    handleChange(
      state: IState,
      action: PayloadAction<{ key: string; value: any }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    resetState(state: IState) {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export const selectReceipt = (state: RootState) => state.createReceipt;

export const { handleChange, resetState } = createReceiptSlice.actions;

export default createReceiptSlice.reducer;
