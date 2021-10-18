import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterProps = {
  key: string;
  value: string;
};

interface ClientState {
  filter: {
    clientType: string;
    companyType: string | null;
    monthAdded: string;
  };
  appliedFilter: {
    clientType: string;
    companyType: string | null;
    monthAdded: string;
  };
}

const initialState: ClientState = {
  filter: {
    clientType: "",
    companyType: null,
    monthAdded: "",
  },
  appliedFilter: {
    clientType: "",
    companyType: null,
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
        clientType: "",
        companyType: null,
        monthAdded: "",
      };
      state.appliedFilter = {
        clientType: "",
        companyType: null,
        monthAdded: "",
      };
    },
    handleFilter: (state, action: PayloadAction<FilterProps>) => {
      let { key, value } = action.payload;
      if (key === "clientType") {
        state.filter = {
          ...state.filter,
          companyType: null,
          [key]: value,
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
