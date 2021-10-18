import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import CounterReducer from "redux/reducers/counterSlice";
import errorReducer from "redux/reducers/errorSlice";
import GlobalReducer from "redux/reducers/globalSlice";
import addServiceReducer from "redux/reducers/addServiceSlice";
import clientReducer from "redux/reducers/clientSlice";

let middleware = [logger];

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    error: errorReducer,
    global: GlobalReducer,
    addservice: addServiceReducer,
    client: clientReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
