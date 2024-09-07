import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../Types/index";
import uploadImageToCloudinary from "./imageUpload";

// Define async thunks
export const signUpCall = createAsyncThunk(
  "user/signUp",
  async (data: User, { rejectWithValue }) => {
    try {
      if (data.imageUrl && typeof data.imageUrl !== "string") {
        // Assuming uploadImageToCloudinary is already imported
        data.imageUrl = await uploadImageToCloudinary(data.imageUrl);
      }
      // Assuming your backend endpoint for sign-up
      const response = await axios.post("/api/auth/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const googleSignUpCall = createAsyncThunk(
//   "user/googleSignUp",
//   async (googleAccessToken: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/auth/google-signup", {
//         googleAccessToken,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const signInCall = createAsyncThunk(
  "user/signIn",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/signin", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const TwoStepCall = createAsyncThunk(
  "user/twoStep",
  async (OTP: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/verify-otp", { OTP });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/doctors");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
