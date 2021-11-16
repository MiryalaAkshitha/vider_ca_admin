import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import addServiceReducer from "redux/reducers/addServiceSlice";
import clientReducer from "redux/reducers/clientSlice";
import CounterReducer from "redux/reducers/counterSlice";
import errorReducer from "redux/reducers/errorSlice";
import formsReducer from "redux/reducers/formsSlice";
import GlobalReducer from "redux/reducers/globalSlice";
import storageReducer from "redux/reducers/storageSlice";

let middleware = [];

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    error: errorReducer,
    global: GlobalReducer,
    addservice: addServiceReducer,
    client: clientReducer,
    forms: formsReducer,
    storage: storageReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
