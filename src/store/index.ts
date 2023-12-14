import { configureStore } from "@reduxjs/toolkit";
import lesson from "./lesson";
import module from "./module/index";
import auth from "./auth";
import Toast from './toast/index';
import { history } from "./history/historySlice"

export const store = configureStore({
  reducer: {
    Toast,
    auth,
    lesson,
    module,
    history
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
