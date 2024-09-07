import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerDoctor } from "../Redux/Api/User";

// Zod schema for doctor form validation
const doctorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  dob: z.string().min(1, "DOB is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  contactNumber: z.string().min(10, "Invalid contact number"),
  address: z.string().min(1, "Address is required"),
  gender: z.string().min(1, "Gender is required"),
  experience: z.string().min(1, "Experience is required"),
  description: z.string().min(1, "Description is required"),
  specializations: z.string().min(1, "Specializations are required"),
  timeSlots: z
    .array(
      z.object({
        day: z.string().min(1, "Day is required"),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required"),
      })
    )
    .nonempty("At least one time slot is required"),
});

function DashboardAdmin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Make sure this line is not commented out

    const toastId = toast.loading("Registering doctor...");

    try {
      const dataWithImage = { ...data, image };
      console.log("Data with image:", dataWithImage);

      // Uncomment and use mutation.mutateAsync when ready
      // await mutation.mutateAsync(dataWithImage);

      toast.success("Doctor registered successfully", { id: toastId });
    } catch (error) {
      toast.error("Error registering doctor", { id: toastId });
    }
  };

  //   const mutation = useMutation({
  //     mutationFn: registerDoctor,
  //     onSuccess: () => {
  //       console.log("Doctor registered successfully");
  //       navigate("/dashboard");
  //     },
  //     onError: () => {
  //       console.log("Error registering doctor");
  //     },
  //   });

  const handleTimeSlotChange = (index, field, value) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][field] = value;
    setTimeSlots(newTimeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: "", endTime: "" }]);
  };

  const removeTimeSlot = (index) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Doctor Registration
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          {/* Name Field */}
          <div className="mb-2">
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Name
              </Typography>
            </label>
            <Input
              {...register("name")}
              type="text"
              size="lg"
              placeholder="Doctor's Name"
              className="!border !border-gray-300 bg-white"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-2">
            <label htmlFor="dob">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Date of Birth
              </Typography>
            </label>
            <Input
              {...register("dob")}
              type="date"
              size="lg"
              className="!border !border-gray-300 bg-white"
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
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
              {...register("email")}
              type="email"
              size="lg"
              placeholder="Email Address"
              className="!border !border-gray-300 bg-white"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
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
              {...register("password")}
              size="lg"
              placeholder="********"
              type={passwordShown ? "text" : "password"}
              className="!border !border-gray-300 bg-white"
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
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="mb-2">
            <label htmlFor="contactNumber">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Contact Number
              </Typography>
            </label>
            <Input
              {...register("contactNumber")}
              type="tel"
              size="lg"
              placeholder="Contact Number"
              className="!border !border-gray-300 bg-white"
            />
            {errors.contactNumber && (
              <p className="text-red-500">{errors.contactNumber.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-2">
            <label htmlFor="address">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Address
              </Typography>
            </label>
            <Input
              {...register("address")}
              type="text"
              size="lg"
              placeholder="Address"
              className="!border !border-gray-300 bg-white"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="mb-2">
            <label htmlFor="gender">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Gender
              </Typography>
            </label>
            <Input
              {...register("gender")}
              type="text"
              size="lg"
              placeholder="Gender"
              className="!border !border-gray-300 bg-white"
            />
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Experience Field */}
          <div className="mb-2">
            <label htmlFor="experience">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Experience
              </Typography>
            </label>
            <Input
              {...register("experience")}
              type="text"
              size="lg"
              placeholder="Experience"
              className="!border !border-gray-300 bg-white"
            />
            {errors.experience && (
              <p className="text-red-500">{errors.experience.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-2">
            <label htmlFor="description">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Description
              </Typography>
            </label>
            <Input
              {...register("description")}
              type="text"
              size="lg"
              placeholder="Description"
              className="!border !border-gray-300 bg-white"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Specializations Field */}
          <div className="mb-2">
            <label htmlFor="specializations">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Specializations
              </Typography>
            </label>
            <Input
              {...register("specializations")}
              type="text"
              size="lg"
              placeholder="Specializations"
              className="!border !border-gray-300 bg-white"
            />
            {errors.specializations && (
              <p className="text-red-500">{errors.specializations.message}</p>
            )}
          </div>

          {/* Time Slots Fields */}
          <div className="mb-2">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Time Slots
            </Typography>
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex mb-2 gap-4">
                <Input
                  value={slot.day}
                  onChange={(e) =>
                    handleTimeSlotChange(index, "day", e.target.value)
                  }
                  type="text"
                  size="lg"
                  placeholder="Day"
                  className="!border !border-gray-300 bg-white"
                />
                <Input
                  value={slot.startTime}
                  onChange={(e) =>
                    handleTimeSlotChange(index, "startTime", e.target.value)
                  }
                  type="time"
                  size="lg"
                  className="!border !border-gray-300 bg-white"
                />
                <Input
                  value={slot.endTime}
                  onChange={(e) =>
                    handleTimeSlotChange(index, "endTime", e.target.value)
                  }
                  type="time"
                  size="lg"
                  className="!border !border-gray-300 bg-white"
                />
                <Button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  color="red"
                  className="w-8 h-8 p-0"
                >
                  X
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addTimeSlot}
              color="blue"
              className="mt-2"
            >
              Add Time Slot
            </Button>
          </div>

          {/* Submit Button */}
          <Button type="submit" color="blue" fullWidth className="mt-6">
            Register Doctor
          </Button>
        </form>
      </div>
    </section>
  );
}
export default DashboardAdmin;
