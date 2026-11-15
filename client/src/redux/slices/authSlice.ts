import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CurrentUser {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  createdAt: string;
}

interface AuthState {
  token: string | null;
  user: CurrentUser | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: CurrentUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "authenticated";

      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "unauthenticated";

      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
