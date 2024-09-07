// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpCall, signInCall, TwoStepCall, getDoctors } from "./Api/User";
import { User } from "../Types/index";

interface UserState {
  user?: User;
  doctors: any[]; // Adjust the type according to your API response
  loading: boolean;
  error?: string;
  signUpStatus?: string;
  signInStatus?: string;
}

const initialState: UserState = {
  user: undefined,
  doctors: [],
  loading: false,
  error: undefined,
  signUpStatus: undefined,
  signInStatus: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInCall.pending, (state) => {
        state.loading = true;
        state.signInStatus = "loading";
      })
      .addCase(signInCall.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.signInStatus = "succeeded";
      })
      .addCase(signInCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.signInStatus = "failed";
      })
      // Two-Step Verification
      .addCase(TwoStepCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(TwoStepCall.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(TwoStepCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Doctors
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
