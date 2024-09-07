import axios from "axios";
import uploadImageToCloudinary from "../Api/imageUpload";
import { User } from "../Types/index";

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


export const signInCall = async () => {
  // Your sign-in logic here
  // For example, you can use axios to make a POST request to your API
  // const response = await axios.post("/api/auth/signin", data);
  // return response.data;
};
