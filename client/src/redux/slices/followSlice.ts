import { createSlice } from "@reduxjs/toolkit";
import {
  currentFollowers,
  followUser,
  unfollowUser,
} from "../functions/followFunctions";

export interface FollowTypes {
  _id: string;
  follower: string;
  following: string;
}

interface FollowState {
  data: FollowTypes[];
  status: "idle" | "success" | "failed" | "loading";
  error: string | null;
}

const initialState: FollowState = {
  data: [],
  status: "idle",
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Folllow
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      // Unfollow
      .addCase(unfollowUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data.filter((like) => like._id !== action.payload._id);
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      //get current state
      .addCase(currentFollowers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(currentFollowers.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      })
      .addCase(currentFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default followSlice.reducer;
