import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsLoader";
import userReducer from "./slices/getUser";

const store = configureStore({
  reducer: {
    postsLoader: postsReducer,
    getUser: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
