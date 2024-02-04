import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Profile = {
  username: string;
  isAuthenticated: boolean;
};

const initialState: Profile = {
  username: "Guest",
  isAuthenticated: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearProfile: (state) => {
      state.username = "Guest";
      state.isAuthenticated = false;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
