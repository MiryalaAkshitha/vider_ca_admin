import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "redux/store";

interface FilterPayload {
  checked: boolean;
  value: {
    label: string;
    value: string | number;
  };
}

interface CustomDatePayload {
  dateType: "fromDate" | "toDate";
  value: string;
}

type Filter = {
  assignee: Array<{ label: string; value: number }>;
  createdBy: Array<{ label: string; value: number }>;
  completedBy: Array<{ label: string; value: number }>;
  status: Array<{ label: string; value: string }>;
  priority: Array<{ label: string; value: string }>;
  tags: Array<{ label: string; value: string }>;
  taskType: Array<{ label: string; value: string }>;
  startDate: Array<{ label: string; value: string }>;
  dueOn: Array<{ label: string; value: string }>;
  createdOn: Array<{ label: string; value: string }>;
  completedOn: Array<{ label: string; value: string }>;
  category: Array<{ label: string; value: string }>;
  subCategory: Array<{ label: string; value: string }>;
  clientCategory: Array<{ label: string; value: string }>;
  clientSubCategory: Array<{ label: string; value: string }>;
  financialYear: Array<{ label: string; value: string }>;
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
      toDate: string;
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
  financialYear: [],
  customDates: {
    startDate: {
      fromDate: moment().subtract(1,"day").format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
    },
    dueOn: {
      fromDate:moment().subtract(1,"day").format("YYYY-MM-DD") ,
      toDate:moment().format("YYYY-MM-DD") ,
    },
    createdOn: {
      fromDate: moment().subtract(1,"day").format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
    },
    completedOn: {
      fromDate: moment().subtract(1,"day").format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
    },
  },
};

interface InitialState {
  selectedFilters: Filter;
  appliedFilters: Filter;
  selected: string;
  search: string;
}

const initialState: InitialState = {
  selectedFilters: filterState,
  appliedFilters: filterState,
  selected: "category",
  search: "",
};

export const taskBoardSlice = createSlice({
  name: "taskboard",
  initialState,
  reducers: {
    handleFilters(state: any, action: PayloadAction<FilterPayload>) {
      let filterItem = state.selectedFilters[state.selected];
      if (action.payload.checked) {
        state.selectedFilters[state.selected].push(action.payload.value);
      } else {
        state.selectedFilters[state.selected] = filterItem.filter(
          (item: any) => item.value !== action.payload.value.value
        );
      }
    },
    handleCustomDates(state, action: PayloadAction<CustomDatePayload>) {
      let selectedCustomDate = state.selectedFilters.customDates[state.selected];
      selectedCustomDate[action.payload.dateType] = action.payload.value;
    },
    handleCategories(state, action: PayloadAction<{ value: any[]; key: string }>) {
      state.selectedFilters[action.payload.key] = action.payload.value;
    },
    handleSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    handleSelected(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    handleRemove(state, action: PayloadAction<{ filter: string; filterItemIndex: number }>) {
      const { filter, filterItemIndex } = action.payload;
      state.appliedFilters[filter] = state.appliedFilters[filter].filter(
        (item: any, index: number) => index !== filterItemIndex
      );
      state.selectedFilters[filter] = state.appliedFilters[filter].filter(
        (item: any, index: number) => index !== filterItemIndex
      );
    },
    handleApply(state: InitialState) {
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
  handleSearch,
  handleRemove,
} = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
