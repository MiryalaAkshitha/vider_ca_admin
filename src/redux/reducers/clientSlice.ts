import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterProps = {
  key: string;
  value: string;
};

interface ClientState {
  filter: {
    category: string;
    subCategory: string | null;
    monthAdded: string;
  };
  appliedFilter: {
    category: string;
    subCategory: string | null;
    monthAdded: string;
  };
}

const initialState: ClientState = {
  filter: {
    category: "",
    subCategory: null,
    monthAdded: "",
  },
  appliedFilter: {
    category: "",
    subCategory: null,
    monthAdded: "",
  },
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    applyFilters: (state) => {
      state.appliedFilter = state.filter;
    },
    resetFilters: (state) => {
      state.filter = {
        category: "",
        subCategory: null,
        monthAdded: "",
      };
      state.appliedFilter = {
        category: "",
        subCategory: null,
        monthAdded: "",
      };
    },
    handleFilter: (state, action: PayloadAction<FilterProps>) => {
      let { key, value } = action.payload;
      if (key === "category") {
        state.filter = {
          ...state.filter,
          category: value,
          subCategory: null,
        };
        return;
      }
      state.filter = {
        ...state.filter,
        [key]: value,
      };
    },
  },
});

export const { handleFilter, applyFilters, resetFilters } = clientSlice.actions;

export const selectClient = (state: RootState) => state.client;

export default clientSlice.reducer;
