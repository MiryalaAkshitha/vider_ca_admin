import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import formsReducer from "redux/reducers/formsSlice";
import GlobalReducer from "redux/reducers/globalSlice";
import storageReducer from "redux/reducers/storageSlice";
import taskBoardReducer from "redux/reducers/taskboardSlice";
import createInvoiceReducer from "./reducers/createInvoiceSlice";
import signUpSliceReducer from "./reducers/signUpSlice";
import addServiceReducer from "./reducers/addServiceSlice";
import createReceiptReducer from "./reducers/createReceiptSlice";

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    forms: formsReducer,
    storage: storageReducer,
    taskBoard: taskBoardReducer,
    signup: signUpSliceReducer,
    createInvoice: createInvoiceReducer,
    createReceipt: createReceiptReducer,
    addService: addServiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
