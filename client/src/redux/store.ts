import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import updateUserReducer from "./slices/updateUserSlice";
import likesReducer from "./slices/likeSlice";
import searchUsersReducer from "./slices/searchUsersSlice";
import followReducer from "./slices/followSlice";

const store = configureStore({
  reducer: {
    postsLoader: postsReducer,
    user: authReducer,
    modal: modalReducer,
    updateUser: updateUserReducer,
    likes: likesReducer,
    searchUsers: searchUsersReducer,
    follow: followReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
