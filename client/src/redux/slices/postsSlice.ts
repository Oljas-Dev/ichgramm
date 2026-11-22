import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./authSlice";
import type { currentPostType } from "../../types/projectTypes";
import {
  deletePost,
  fetchAllPosts,
  fetchPostById,
  fetchProfilePage,
} from "../functions/postFunctions";
import type { LikeTypes } from "./likeSlice";

export interface Post {
  _id: string;
  description: string;
  image: string;
  likes: LikeTypes[];
  user: User;
  isOwner: boolean;
}

export interface accumulatedDataTypes {
  profilePosts: currentPostType[];
  profileData: User;
}

export interface PostsState {
  data: Post[];
  accumulatedData: accumulatedDataTypes | null;
  currentPost: currentPostType[];
  postById: currentPostType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading?: boolean;
}

const initialState: PostsState = {
  data: [],
  currentPost: [],
  accumulatedData: null,
  postById: {
    description: "",
    image: "",
    likes: [],
    comments: [],
    createdAt: "",
    updatedAt: "",
    user: null,
    _id: "",
  },
  status: "idle",
  error: null,
};

const postsReducer = createSlice({
  name: "postsLoader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(fetchProfilePage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfilePage.fulfilled, (state, action) => {
        state.accumulatedData = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProfilePage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postById = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;

        state.data = state.data.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete post";
      });
  },
});

export default postsReducer.reducer;
