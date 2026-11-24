import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "./authSlice";
import { fetchUrl } from "../../variables/commonVariables";

interface SearchState {
  results: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentRequestId: string | null;
}

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
  currentRequestId: null,
};

export const searchUsers = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("search/searchUsers", async (query, { rejectWithValue, signal }) => {
  try {
    const response = await axios.get(`${fetchUrl}/users/search`, {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      signal,
    });

    return response.data.response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message || "Could not search users",
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

const searchUsersSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
      state.currentRequestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;

        state.status = "succeeded";
        state.results = action.payload;
        state.currentRequestId = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        if (action.meta.aborted) return; // ignoring intentional cancellation
        if (state.currentRequestId !== action.meta.requestId) return; // prevents outdated responses from overwriting the latest search results.

        state.status = "failed";
        state.error = action.payload || "Search failed";
        state.currentRequestId = null;
      });
  },
});

export const { clearSearchResults } = searchUsersSlice.actions;
export default searchUsersSlice.reducer;
