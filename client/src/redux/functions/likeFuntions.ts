import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LikeTypes } from "../slices/likeSlice";
import axios from "axios";
import { fetchUrl } from "../../variables/commonVariables";

const savedToken = localStorage.getItem("token");

export const likePost = createAsyncThunk<
  LikeTypes,
  string,
  { rejectValue: string }
>("post/like", async (postId, thunkApi) => {
  try {
    const response = await axios.post(
      `${fetchUrl}/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      },
    );

    return response.data.response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }

    return thunkApi.rejectWithValue("Something went wrong");
  }
});

export const dislikePost = createAsyncThunk<
  LikeTypes,
  string | undefined,
  { rejectValue: string }
>("post/dislike", async (payload, thunkApi) => {
  try {
    const response = await axios.delete(`${fetchUrl}/dislike/${payload}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${savedToken}`,
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
