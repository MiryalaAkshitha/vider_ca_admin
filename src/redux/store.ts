import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import formsReducer from "redux/reducers/formsSlice";
import GlobalReducer from "redux/reducers/globalSlice";
import storageReducer from "redux/reducers/storageSlice";
import taskBoardReducer from "redux/reducers/taskboardSlice";
import createInvoiceReducer from "./reducers/createInvoiceSlice";
import signUpSliceReducer from "./reducers/signUpSlice";

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    forms: formsReducer,
    storage: storageReducer,
    taskBoard: taskBoardReducer,
    signup: signUpSliceReducer,
    createInvoice: createInvoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
