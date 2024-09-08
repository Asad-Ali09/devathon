import axios, { AxiosError } from "axios";
import uploadImageToCloudinary from "../Api/imageUpload";
import { User } from "../Types/index";
// import toast from "react-hot-toast";

export const signUpCall = async (data: User) => {
  try {
    if (data.imageUrl && typeof data.imageUrl !== "string") {
      data.imageUrl = await uploadImageToCloudinary(data.imageUrl);
    }
    console.log("After the upload data", data);
    const axiosData = await axios.post("/auth/signup", data);
    return axiosData.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.message || "An error occurred during sign up."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
export const TwoStepCall = async (OTP: number) => {
  console.log(OTP);

  try {
    const response = await axios.post("/auth/verify/", {
      code: OTP,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      throw error.response?.data?.message || "Error Verifying you";
    }
  }
};

// export const googleSignUpCall = async (googleAccessToken: string) => {
//   const response = await axios.post("/api/auth/google-signup", {
//     googleAccessToken,
//   });
//   return response.data;
// };

export const signInCall = async (data: { email: string; password: string }) => {
  try {
    const success = await axios.post("/auth/", data);
    console.log(success);
    return success.data?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message || "Unexpected Error";
    }
  }
};

export const registerDoctor = () => {};
export const getDoctors = () => {};
