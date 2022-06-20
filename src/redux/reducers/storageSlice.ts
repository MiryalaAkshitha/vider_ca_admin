import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface IUploads {
  name: string;
  data: any;
  error: any;
  loading: boolean;
}

interface IPermissions {
  write: boolean;
  edit: boolean;
  delete: boolean;
}

interface StorageState {
  uploads: IUploads[];
  count: number;
  currentStorage: Array<any>;
  permissions: IPermissions;
}

const initialState: StorageState = {
  uploads: [],
  count: 0,
  currentStorage: [],
  permissions: {
    write: false,
    edit: false,
    delete: false,
  },
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setInitialUploads: (state: StorageState, action: PayloadAction<File[]>) => {
      Array.from(action.payload).forEach((item: File) => {
        state.uploads.push({
          name: item.name,
          data: null,
          error: null,
          loading: true,
        });
      });
    },
    resetUploads(state: StorageState) {
      state.uploads = [];
      state.count = 0;
    },
    setUploadData(state: StorageState, action) {
      state.uploads[state.count].data = action.payload;
      state.uploads[state.count].loading = false;
      state.count = state.count + 1;
    },
    setUploadError(state: StorageState, action) {
      state.uploads[state.count].error = action.payload;
      state.uploads[state.count].loading = false;
      state.count = state.count + 1;
    },
    setCurrentStorage(state: StorageState, action) {
      state.currentStorage = action.payload;
    },
    setPermissions(state: StorageState, action: PayloadAction<IPermissions>) {
      state.permissions = action.payload;
    },
  },
});

export const selectStorage = (state: RootState) => state.storage;

export const {
  setInitialUploads,
  resetUploads,
  setUploadData,
  setUploadError,
  setCurrentStorage,
  setPermissions,
} = storageSlice.actions;

export default storageSlice.reducer;
