import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "redux/store";

export interface IState {
  receiptDate: string;
  client: number | null;
  type: "INVOICE" | "TASK" | "ADVANCE";
  amount: number;
  previousCredits: number;
  paymentMode: "CASH" | "CREDIT_CARD" | "CHEQUE" | "BANK_TRANSFER" | "UPI";
  paymentDate: string;
  referenceNumber: string;
}

const initialState: IState = {
  receiptDate: "",
  client: null,
  type: "INVOICE",
  amount: 0,
  previousCredits: 0,
  paymentMode: "CASH",
  paymentDate: "",
  referenceNumber: "",
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
