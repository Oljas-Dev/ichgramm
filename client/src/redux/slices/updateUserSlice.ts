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
    const formData = new FormData();

    formData.append("username", payload.data.username);
    formData.append("website", payload.data.website);
    formData.append("about", payload.data.about);

    if (payload.data.avatar?.[0]) {
      formData.append("image", payload.data.avatar[0]);
    }

    const response = await axios.put(
      `${fetchUrl}/update-user/${payload.userId}`,
      formData,
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
