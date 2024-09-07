import axios from "axios";
import uploadImageToCloudinary from "../Api/imageUpload";
import { User } from "../Types/index";
import toast from "react-hot-toast";

export const signUpCall = async (data: User) => {
  if (data.image && typeof data.image != "string") {
    data.image = await uploadImageToCloudinary(data.image);
  }
  console.log("After the upload data", data);
};
export const googleSignUpCall = async (googleAccessToken: string) => {
  const response = await axios.post("/api/auth/google-signup", {
    googleAccessToken,
  });
  return response.data;
};

export const TwoStepCall = async (OTP: string) => {
  console.log(OTP);
  const response = await axios.post("/", {
    OTP: OTP,
  });
  return response?.data;
};
