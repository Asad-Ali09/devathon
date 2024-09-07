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
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
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

    try {
      const dataWithImage: User = {
        ...data,
        image: image,
      };
      await mutation.mutateAsync(dataWithImage);
      toast.success("Form submitted successfully", { id: toastId });
    } catch (error: any) {
      toast.error("There was an error submitting the form", { id: toastId });
    }
  };

  //for regular signIn
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
    } catch (error: any) {
      toast.error("Error signing up", { id: toastId });
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your username, email, and password to sign up
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          {/* Username Field */}
          <div className="mb-2">
            <label htmlFor="username">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Username
              </Typography>
            </label>
            <Input
              labelProps={{
                className: "hidden",
              }}
              {...register("username")}
              name="username"
              type="text"
              size="lg"
              placeholder="Username"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-2">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Email
              </Typography>
            </label>
            <Input
              labelProps={{
                className: "hidden",
              }}
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
          {/* Password Field */}
          <div className="mb-2">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              labelProps={{
                className: "hidden",
              }}
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

          {/* Image Upload Field */}
          <div className="mb-2">
            <label htmlFor="image">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Add Your Image
              </Typography>
            </label>
            <Input
              labelProps={{
                className: "hidden",
              }}
              type="file"
              size="lg"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            color="gray"
            size="lg"
            className="mt-4"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>

          <div className="mt-4 ">
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => {
                toast.error("Error in Google Login");
              }}
              size="large"
            />
          </div>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
