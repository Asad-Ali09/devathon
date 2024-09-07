// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor, User } from "../Types/index";
import { getDoctors, signUpCall } from "./Api/User";

interface UserState {
  doctors: Doctor[];
  loading: boolean;
  user: User | null;
  error?: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  doctors: [],
  loading: false,
  user: null,
  error: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDoctors.fulfilled,
        (state, action: PayloadAction<Doctor[]>) => {
          state.loading = false;
          state.doctors = action.payload;
        }
      )
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        // Ensure error is extracted properly
        state.error = action.error.message || "Failed to fetch doctors";
      })
      .addCase(signUpCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpCall.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signUpCall.rejected, (state, action) => {
        state.loading = false;
        // Ensure error is extracted properly
        state.error = action.error.message || "Failed to sign up";
      });
  },
});

export default userSlice.reducer;
