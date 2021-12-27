import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import addServiceReducer from "redux/reducers/addServiceSlice";
import errorReducer from "redux/reducers/errorSlice";
import formsReducer from "redux/reducers/formsSlice";
import GlobalReducer from "redux/reducers/globalSlice";
import storageReducer from "redux/reducers/storageSlice";
import taskBoardReducer from "redux/reducers/taskboardSlice";

const store = configureStore({
  reducer: {
    error: errorReducer,
    global: GlobalReducer,
    addservice: addServiceReducer,
    forms: formsReducer,
    storage: storageReducer,
    taskBoard: taskBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
