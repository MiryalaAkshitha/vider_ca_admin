import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

interface FilterPayload {
  checked: boolean;
  value: string | number;
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
};

interface InitialState {
  selectedFilters: Filter;
  appliedFilters: Filter;
  selected: string;
}

const initialState: InitialState = {
  selectedFilters: filterState,
  appliedFilters: filterState,
  selected: "assignee",
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

export const { resetFilters, handleSelected, handleFilters, handleApply } =
  taskBoardSlice.actions;

export default taskBoardSlice.reducer;
