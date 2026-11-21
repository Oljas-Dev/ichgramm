import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "./authSlice";
import type { currentPostType } from "../../types/projectTypes";
import { fetchUrl } from "../../variables/commonVariables";
export interface Post {
  _id: string;
  description: string;
  image: string;
  likes?: number;
  user: User;
  isOwner: boolean;
}

interface accumulatedDataTypes {
  profilePosts: currentPostType[];
  profileData: User;
}

interface PostsState {
  data: Post[];
  accumulatedData: accumulatedDataTypes | null;
  currentPost: currentPostType[];
  postById: currentPostType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  data: [],
  currentPost: [],
  accumulatedData: null,
  postById: {
    description: "",
    image: "",
    likes: 0,
    comments: [],
    createdAt: "",
    updatedAt: "",
    user: null,
    _id: "",
  },
  status: "idle",
  error: null,
};

export const fetchAllPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("loader/fetchAllPosts", async (payload, thunkApi) => {
  try {
    const response = await axios.get(`${fetchUrl}/${payload}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
});

export const fetchProfilePage = createAsyncThunk<
  accumulatedDataTypes,
  string | undefined,
  { rejectValue: string }
>("loader/fetchProfilePage", async (payload, thunkApi) => {
  try {
    const response = await axios.get(`${fetchUrl}/profilePage/${payload}`);

    return response.data.accumulatedData;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
});

export const fetchPostById = createAsyncThunk<
  currentPostType,
  string | undefined,
  { rejectValue: string }
>("loader/postById", async (payload, thunkApi) => {
  try {
    const response = await axios.get(`${fetchUrl}/posts/${payload}`);

    return response.data.post;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
    return thunkApi.rejectWithValue("Something went wrong");
  }
});

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
      });
  },
});

export default postsReducer.reducer;
