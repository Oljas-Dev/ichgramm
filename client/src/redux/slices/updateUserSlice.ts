import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UpdateUserTypes } from "../../pages/profile/edit";
import axios from "axios";
import { fetchUrl } from "../../variables/commonVariables";

const savedToken = localStorage.getItem("token");

const initialState: UpdateUserTypes = {
  username: "",
  website: "",
  avatar: null,
  about: "",
};

export const updateUserProfile = createAsyncThunk<
  UpdateUserTypes,
  {
    userId: string | undefined;
    data: UpdateUserTypes;
  },
  { rejectValue: string }
>("update/updateUser", async (payload, thunkApi) => {
  try {
    const response = await axios.put(
      `${fetchUrl}/update-user/${payload.userId}`,
      payload.data,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${savedToken}`,
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
    return thunkApi.rejectWithValue("Could not update user");
  }
});

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  // extraReducers: {}
});

export default updateUserSlice.reducer;
