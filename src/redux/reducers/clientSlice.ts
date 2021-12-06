import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterProps = {
  key: string;
  value: any;
};

interface ClientState {
  category: string[];
  subCategory: string[];
  monthAdded: string;
  labels: string[];
}

const initialState: ClientState = {
  category: [],
  subCategory: [],
  monthAdded: "",
  labels: [],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.category = [];
      state.subCategory = [];
      state.monthAdded = "";
      state.labels = [];
    },
    handleFilter: (state, action: PayloadAction<FilterProps>) => {
      let { key, value } = action.payload;
      if (key === "category") {
        state.category = value;
        state.subCategory = [];
        return;
      }
      state[key] = value;
    },
  },
});

export const { handleFilter, resetFilters } = clientSlice.actions;

export const selectClient = (state: RootState) => state.client;

export default clientSlice.reducer;
