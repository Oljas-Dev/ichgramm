import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUrl } from "../../variables/commonVariables";
import type { FollowTypes } from "../slices/followSlice";

const savedToken = localStorage.getItem("token");

export const currentFollowers = createAsyncThunk<
  FollowTypes,
  string,
  { rejectValue: string }
>("users/currentFollowers", async (payload, thunkApi) => {
  try {
    const response = await axios.get(`${fetchUrl}/followers/${payload}`, {
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

export const followUser = createAsyncThunk<
  FollowTypes,
  string,
  { rejectValue: string }
>("users/follow", async (payload, thunkApi) => {
  try {
    const response = await axios.post(
      `${fetchUrl}/follow/${payload}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${savedToken}`,
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
    return thunkApi.rejectWithValue("Something went wrong");
  }
});

export const unfollowUser = createAsyncThunk<
  FollowTypes,
  string,
  { rejectValue: string }
>("users/unfollow", async (payload, thunkApi) => {
  try {
    const response = await axios.delete(`${fetchUrl}/unfollow/${payload}`, {
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
