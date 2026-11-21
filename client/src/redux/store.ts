import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsLoader";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import updateUserReducer from "./slices/updateUserSlice";

const store = configureStore({
  reducer: {
    postsLoader: postsReducer,
    user: authReducer,
    modal: modalReducer,
    updateUser: updateUserReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
