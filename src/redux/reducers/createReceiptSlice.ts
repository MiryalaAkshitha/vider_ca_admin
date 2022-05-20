import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const taskReceiptHeadings = [
    {
        index: 1,
        title: "Particulars"
    },
    {
        index: 2,
        title: "Units"
    },
    {
        index: 3,
        title: "Price"
    },
    {
        index: 4,
        title: "Discount"
    },
    {
        index: 5,
        title: "Payable Amount"
    },
    {
        index: 6,
        title: "Paid Amount"
    },

]

interface TaskReceipt {
    name: string;
    units: number;
    price: number;
    discountType: "PERCENT" | "AMOUNT";
    discount: number;
    payableAmount: number;
    paidAmount: number;

}

export interface ICreateReceipt {
    TaskReceipt: Array<TaskReceipt>;
}

const initialState: ICreateReceipt = {
    TaskReceipt: [],
};

export const createReceiptSlice = createSlice({
    name: "createReceipt",
    initialState,
    reducers: {
        handleChange(
            state,
            action: PayloadAction<{ key: string; value: string | number | null }>
        ) {
            state[action.payload.key] = action.payload.value;
        },
        handleAddParticular(state) {
            state.TaskReceipt.push({
                name: "",
                units: 1,
                price: 0,
                discountType: "PERCENT",
                discount: 0,
                payableAmount: 0,
                paidAmount: 0,
            });
        },
        handleRemoveParticular(state, action: PayloadAction<number>) {
            state.TaskReceipt.splice(action.payload, 1);
        },
        handleChangeParticular(
            state,
            action: PayloadAction<{
                index: number;
                key: string;
                value: string | number | null;
            }>
        ) {
            state.TaskReceipt[action.payload.index][action.payload.key] =
                action.payload.value;
        },
    }
})

export const selectReceipt = (state: RootState) => state.createReceipt;

export const {
    handleAddParticular,
    handleRemoveParticular,
    handleChangeParticular,
    handleChange,
} = createReceiptSlice.actions;

export default createReceiptSlice.reducer;

