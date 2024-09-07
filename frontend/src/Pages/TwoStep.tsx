import React, { FormEvent, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { TwoStepCall } from "../Api/User";
import toast from "react-hot-toast";

const TwoStep = () => {
  const [OTP, setOTP] = useState(""); // OTP should be a string to handle input properly

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Verifying...");
    const response = await TwoStepCall(OTP);
    if (response?.ok) {
      toast.success("Verified", { id: toastId });
    } else {
      toast.error("Error Verifying you", { id: toastId });
    }
  };

  return (
    <section className="grid text-center h-screen items-center mt-10">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Two-Step Verification
        </Typography>
        <Typography className="mb-5 text-gray-600 font-normal text-[18px]">
          Enter the verification code we sent to your email.
        </Typography>

        {/* Verification Code Input */}
        <form
          className="mx-auto max-w-[28rem] text-left"
          onSubmit={handleSubmit} // Form will submit on button click
        >
          <div className="mb-4">
            <label htmlFor="verificationCode">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Verification Code
              </Typography>
            </label>
            <Input
              labelProps={{ className: "hidden" }}
              type="text"
              value={OTP}
              placeholder="Enter 6-digit code"
              size="lg"
              onChange={(e) => setOTP(e.target.value)} // Update state with input value
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
            />
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            type="submit"
            color="black"
            className="w-full mt-8 mb-4"
          >
            Verify Code
          </Button>
        </form>

        {/* Link to Resend Code */}
        <Typography className="mt-4 font-normal text-gray-500 text-center text-[16px]">
          Didn't receive the code?{" "}
          <Link to="#" className="text-blue-500 hover:underline">
            Resend Code
          </Link>
        </Typography>
      </div>
    </section>
  );
};

export default TwoStep;
