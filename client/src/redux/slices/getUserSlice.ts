import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  username: string;
  fullname: string;
  avatar?: string;
  friends?: string[];
  createdAt?: string;
  _id: string;
}

interface UserState {
  data: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const savedToken = localStorage.getItem("token");

const initialState: UserState = {
  data: null,
  token: savedToken,
  status: savedToken ? "loading" : "idle",
  error: null,
};

export const getUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "auth/user",
  async (token, thunkApi) => {
    try {
      const response = await axios.get<User>(
        `http://localhost:3333/user/current`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(
          err.response?.data?.message || err.message,
        );
      }
      return thunkApi.rejectWithValue("Could not get user");
    }
  },
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    logout: (state) => {
      state.data = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";

        if (
          action.payload === "Unauthorized" ||
          action.payload === "Invalid or expired token"
        ) {
          state.token = null;
          state.data = null;
          localStorage.removeItem("token");
        }
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
