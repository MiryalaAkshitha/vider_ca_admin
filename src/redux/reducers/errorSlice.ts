import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IErrorStore {
  error?: string | null;
  statusCode?: number | null;
  data?: any;
  message?: {
    heading?: string;
    description?: string;
  };
}

const initialState: IErrorStore = {
  error: null,
  statusCode: null,
  data: {},
  message: {
    heading: "",
    description: "",
  },
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateError(state, action: PayloadAction<IErrorStore>) {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
      state.data = action.payload.data;
      state.error = action.payload.error;
    },
    clearError(state) {
      state = {
        error: null,
        statusCode: null,
        data: {},
        message: {
          heading: "",
          description: "",
        },
      };
    },
  },
});

export const selectError = (state: RootState) => state.error;

export const { updateError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
