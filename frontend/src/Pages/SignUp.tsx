import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { User } from "../Types/index";
import { signUpCall, googleSignUpCall } from "../Api/User";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

// Zod schema for form validation
// Zod schema for form validation
const schema = z.object({
  name: z.string().min(3, "userName must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .regex(/^\d+$/, "Contact number must be numeric"),
  dob: z.string().nonempty("Date of Birth is required"),
  address: z.string().nonempty("Address is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
});

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: User) => {
    const toastId = toast.loading("Signing you Up...");
    const dataWithImage: User = {
      ...data,
      imageUrl: image,
    };
    // try {
    //
    //   await mutation.mutateAsync(dataWithImage);
    //   toast.success("Form submitted successfully", { id: toastId });
    // } catch (error: any) {
    //   toast.error("There was an error submitting the form", { id: toastId });
    // }
    console.log(dataWithImage);
  };

  const mutation = useMutation({
    mutationFn: signUpCall,
    onSuccess: () => {
      console.log("Form submitted successfully");
      navigate("/login");
    },
    onError: () => {
      console.log("There is an error right now");
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleSignUpCall,
    onSuccess: () => {
      console.log("Google sign-up successful");
      toast.success("Signed up successfully");
      navigate("/login");
    },
    onError: () => {
      console.log("Error during Google sign-up");
      toast.error("Error signing up");
    },
  });

  const handleGoogleSignIn = async (response: { credential: string }) => {
    const toastId = toast.loading("Signing you up...");
    console.log(response);
    try {
      await googleMutation.mutateAsync(response.credential);
      toast.success("Signed up successfully", { id: toastId });
      navigate("/two-step");
    } catch (error: any) {
      toast.error("Error signing up", { id: toastId });
    }
  };

  return (
    <section className="grid text-center h-screen items-center mt-10">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-5 text-gray-600 font-normal text-[18px]">
          Enter your username, email, and password to sign up
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[48rem] text-left"
        >
          {/* userName and Email Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Username
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("name")}
                name="name"
                type="text"
                size="lg"
                placeholder="userName"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100  focus:!border-gray-900 focus:ring-gray-900/10"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Email
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("email")}
                name="email"
                type="email"
                size="lg"
                placeholder="Email Address"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password and Contact Number Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("password")}
                size="lg"
                placeholder="********"
                type={passwordShown ? "text" : "password"}
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
                icon={
                  <i onClick={togglePasswordVisibility}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contactNumber">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Contact Number
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("contactNumber")}
                name="contactNumber"
                type="tel"
                size="lg"
                placeholder="Contact Number"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* DOB and Address Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dob">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Date of Birth
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("dob")}
                name="dob"
                type="date"
                size="lg"
                placeholder="Date of Birth"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Address
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                {...register("address")}
                name="address"
                type="text"
                size="lg"
                placeholder="Your Address"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Gender and Image Upload Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="gender">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Gender
                </Typography>
              </label>
              <select
                {...register("gender")}
                name="gender"
                className="w-full p-3 border border-gray-300 bg-white text-gray-900 shadow-lg ring-4 ring-transparent focus:border-gray-900 focus:ring-gray-900/10"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="image">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Add Your Image
                </Typography>
              </label>
              <Input
                labelProps={{ className: "hidden" }}
                type="file"
                accept="image/*"
                size="lg"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
              />
            </div>
          </div>

          <Button
            size="lg"
            color="black"
            className="w-full mt-8 mb-4"
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        {/* Google Signup */}
        {/* <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onError={() => console.log("Google Login Error")}
        /> */}
        <Typography className="mt-8 font-normal text-gray-500 text-center text-[16px]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </section>
  );
}
export default SignUp;
