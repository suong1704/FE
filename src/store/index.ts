import { configureStore } from "@reduxjs/toolkit";
import lesson from "./lesson";
import module from "./module/index";
import auth from "./auth";


export const store = configureStore({
  reducer: {
    auth,
    lesson,
    module,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
