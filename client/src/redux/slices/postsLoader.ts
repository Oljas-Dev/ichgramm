import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface Post {
  _id: string;
  description: string;
  publishedDate: string;
  image: string;
  likes?: number;
  user: {
    _id: string;
    username: string;
    fullname: string;
  };
  isOwner: boolean;
}

interface PostsState {
  data: Post[];
  post: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  data: [],
  post: [],
  status: "idle",
  error: null,
};

export const fetchAllPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("loader/fetchAllPosts", async (payload, thunkApi) => {
  try {
    const response = await axios.get(`http://localhost:3333/${payload}/all`, {
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
      });
  },
});

export default postsReducer.reducer;
