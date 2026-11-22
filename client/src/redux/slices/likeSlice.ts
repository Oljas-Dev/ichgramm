import { createSlice } from "@reduxjs/toolkit";
import { dislikePost, likePost } from "../functions/likeFuntions";

export interface LikeTypes {
  _id: string;
  likedBy: string;
  postId: string;
}

interface LikeState {
  likes: LikeTypes[];
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
}

const initialState: LikeState = {
  likes: [],
  status: "idle",
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // LIKE
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "success";
        state.likes.push(action.payload);
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })

      // DISLIKE
      .addCase(dislikePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.status = "success";
        state.likes = state.likes.filter(
          (like) => like._id !== action.payload._id,
        );
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default likeSlice.reducer;
