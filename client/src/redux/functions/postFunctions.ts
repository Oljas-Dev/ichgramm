import { createAsyncThunk } from "@reduxjs/toolkit";
import type { accumulatedDataTypes, Post } from "../slices/postsSlice";
import axios from "axios";
import { fetchUrl } from "../../variables/commonVariables";
import type { currentPostType } from "../../types/projectTypes";

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
    const response = await axios.get(`${fetchUrl}/posts/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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

// Delete post
export const deletePost = createAsyncThunk<
  string | undefined,
  string | undefined,
  { rejectValue: string }
>("posts/deletePost", async (postId, { rejectWithValue }) => {
  try {
    await axios.delete(`${fetchUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return postId;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message || "Could not delete post",
      );
    }

    return rejectWithValue("Something went wrong");
  }
});
