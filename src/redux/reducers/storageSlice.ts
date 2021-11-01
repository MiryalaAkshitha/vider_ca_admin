import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface IUploads {
  name: string;
  data: any;
  error: any;
  loading: boolean;
}

interface StorageState {
  uploads: IUploads[];
  count: number;
}

const initialState: StorageState = {
  uploads: [],
  count: 0,
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setInitialUploads: (state, action: PayloadAction<any[]>) => {
      Array.from(action.payload).forEach((item: any) => {
        state.uploads.push({
          name: item.name,
          data: null,
          error: null,
          loading: true,
        });
      });
    },
    resetUploads(state) {
      state.uploads = [];
      state.count = 0;
    },
    setUploadData(state, action) {
      state.uploads[state.count].data = action.payload;
      state.uploads[state.count].loading = false;
      state.count = state.count + 1;
    },
    setUploadError(state, action) {
      state.uploads[state.count].error = action.payload;
      state.uploads[state.count].loading = false;
      state.count = state.count + 1;
    },
  },
});

export const selectStorage = (state: RootState) => state.storage;

export const {
  setInitialUploads,
  resetUploads,
  setUploadData,
  setUploadError,
} = storageSlice.actions;

export default storageSlice.reducer;
