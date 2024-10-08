import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { loginType, User } from "../Types/index";
import { signInCall } from "../Api/UserCalls"; // Replace with your sign-in API call
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { setUser } from "../Redux/userSlice";
// Zod schema for form validation
const schema = z.object({
  email: z.string().min(1, "Username or Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  //zod+react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(schema),
  });
  //mutation function
  const loginMutation = useMutation({
    mutationFn: signInCall,
  });
  //redux
  const dispatch = useAppDispatch();

  const onSubmit = async (data: { email: string; password: string }) => {
    const toastId = toast.loading("Logging you in...");
    loginMutation.mutateAsync(data, {
      onSuccess: (data: User) => {
        toast.success("You have been logged in Successfully", { id: toastId });
        dispatch(setUser(data));
        navigate("/home");
      },
      onError: (data) => {
        toast.error(`${data}`, { id: toastId });
      },
    });
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Log In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your username or email and password to log in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          {/* Username or Email Field */}
          <div className="mb-4">
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
              type="text"
              size="lg"
              placeholder="Username or Email"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
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

          <Button
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
            type="submit"
          >
            Log In
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
