import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsLoader";
import authReducer from "./slices/getUserSlice";

const store = configureStore({
  reducer: {
    postsLoader: postsReducer,
    user: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
