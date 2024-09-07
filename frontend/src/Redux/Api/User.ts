// src/redux/Api/User.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../Types/index";
import uploadImageToCloudinary from "./imageUpload";
import { Doctor } from "../../Types/index";
import { useToaster } from "react-hot-toast";

export const signUpCall = createAsyncThunk(
  "user/signUp",
  async (data: User, { rejectWithValue }) => {
    try {
      if (data.imageUrl && typeof data.imageUrl !== "string") {
        data.imageUrl = await uploadImageToCloudinary(data.imageUrl);
      }

      const response = await axios.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInCall = createAsyncThunk(
  "user/signIn",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/", data);
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
      const response = await axios.post("/auth/verify", { code: OTP });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Doctor[]>("/api/doctors");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
