import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  username: string;
  fullname: string;
  avatar?: string;
  friends?: string[];
  id: string;
}

interface UserState {
  data: User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  data: {
    username: "",
    fullname: "",
    id: "",
  },
  status: "idle",
  error: null,
};

export const getUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "loader/getUser",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/user/${payload}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

const userReducer = createSlice({
  name: "getUser",
  initialState,
  reducers: {},
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
      });
  },
});

export default userReducer.reducer;

//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     fullname: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       trim: true,
//     },
//   },
