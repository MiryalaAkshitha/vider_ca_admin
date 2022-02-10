import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface FilterPayload {
  checked: boolean;
  value: string | number;
}

interface CustomDatePayload {
  dateType: "fromDate" | "toDate";
  value: string;
}

type Filter = {
  assignee: number[];
  createdBy: number[];
  completedBy: number[];
  status: string[];
  priority: string[];
  tags: string[];
  taskType: string[];
  startDate: string[];
  dueOn: string[];
  createdOn: string[];
  completedOn: string[];
  category: Array<{ label: string; value: string }>;
  subCategory: Array<{ label: string; value: string }>;
  clientCategory: Array<{ label: string; value: string }>;
  clientSubCategory: Array<{ label: string; value: string }>;
  customDates: {
    startDate: {
      fromDate: string;
      toDate: string;
    };
    dueOn: {
      fromDate: string;
      toDate: string;
    };
    createdOn: {
      fromDate: string;
      toDate: string;
    };
    completedOn: {
      fromDate: string;
      toDate: number;
    };
  };
};

const filterState: Filter = {
  assignee: [],
  createdBy: [],
  completedBy: [],
  status: [],
  priority: [],
  tags: [],
  taskType: [],
  startDate: [],
  dueOn: [],
  createdOn: [],
  completedOn: [],
  category: [],
  subCategory: [],
  clientCategory: [],
  clientSubCategory: [],
  customDates: {
    startDate: {
      fromDate: "",
      toDate: "",
    },
    dueOn: {
      fromDate: "",
      toDate: "",
    },
    createdOn: {
      fromDate: "",
      toDate: "",
    },
    completedOn: {
      fromDate: "",
      toDate: 100,
    },
  },
};

interface InitialState {
  selectedFilters: Filter;
  appliedFilters: Filter;
  selected: string;
}

const initialState: InitialState = {
  selectedFilters: filterState,
  appliedFilters: filterState,
  selected: "category",
};

export const taskBoardSlice = createSlice({
  name: "taskboard",
  initialState,
  reducers: {
    handleFilters(state, action: PayloadAction<FilterPayload>) {
      let filterItem = state.selectedFilters[state.selected];
      if (action.payload.checked) {
        state.selectedFilters[state.selected].push(action.payload.value);
      } else {
        state.selectedFilters[state.selected] = filterItem.filter(
          (item: any) => item !== action.payload.value
        );
      }
    },
    handleCustomDates(state, action: PayloadAction<CustomDatePayload>) {
      let selectedCustomDate =
        state.selectedFilters.customDates[state.selected];
      selectedCustomDate[action.payload.dateType] = action.payload.value;
    },
    handleCategories(
      state,
      action: PayloadAction<{ value: any[]; key: string }>
    ) {
      state.selectedFilters[action.payload.key] = action.payload.value;
    },
    handleSelected(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    handleApply(state) {
      state.appliedFilters = state.selectedFilters;
    },
    resetFilters(state) {
      state.selectedFilters = filterState;
      state.appliedFilters = filterState;
    },
  },
});

export const selectTaskBoard = (state: RootState) => state.taskBoard;

export const {
  resetFilters,
  handleSelected,
  handleFilters,
  handleApply,
  handleCategories,
  handleCustomDates,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
