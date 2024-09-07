import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Doctor } from "../Types/index"; // Import the Doctor type

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  imageUrl: z.string().url("Invalid URL").nullable().optional(),
  contactNumber: z.string().min(10, "Contact number must be at least 10 characters long"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  gender: z.enum(["Male", "Female", "Other"], "Please select a gender"),
  specializations: z.string().min(1, "Specializations are required"),
  exp: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    },
    z.number().int().positive("Experience must be a positive number")
  ),
  description: z.string().min(1, "Description is required"),
  timeSlots: z.array(z.object({
    day: z.string(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format (HH:mm)"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format (HH:mm)")
  })).nonempty("At least one time slot is required"),
});


type DoctorFormData = z.infer<typeof schema>;

export function AddDoctor() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      timeSlots: [{ day: "", startTime: "", endTime: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeSlots",
  });

  const onSubmit = (data: DoctorFormData) => {
    console.log("Doctor data:", data);
  };

  return (
    <section className="grid text-center h-screen items-center mt-10">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Add Doctor
        </Typography>
        <Typography className="mb-5 text-gray-600 font-normal text-[18px]">
          Enter the doctor's details to add them
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[48rem] text-left"
        >
          {/* Name Field */}
          <div className="mb-4">
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
              placeholder="Name"
              className="!border !border-gray-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
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
              {...register("email")}
              type="email"
              size="lg"
              placeholder="Email Address"
              className="!border !border-gray-300"
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
              {...register("password")}
              size="lg"
              placeholder="********"
              type={passwordShown ? "text" : "password"}
              className="!border !border-gray-300"
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

          {/* Contact Number Field */}
          <div className="mb-4">
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
              type="text"
              size="lg"
              placeholder="Contact Number"
              className="!border !border-gray-300"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-4">
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
              className="!border !border-gray-300"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dob.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-4">
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
              className="!border !border-gray-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
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
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Specializations Field */}
          <div className="mb-4">
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
              placeholder="Specializations (comma separated)"
              className="!border !border-gray-300"
            />
            {errors.specializations && (
              <p className="text-red-500 text-sm mt-1">
                {errors.specializations.message}
              </p>
            )}
          </div>

          {/* Experience Field */}
          <div className="mb-4">
  <label htmlFor="exp">
    <Typography
      variant="small"
      className="mb-2 block font-medium text-gray-900"
    >
      Experience (Years)
    </Typography>
  </label>
  <Input
    {...register("exp")}
    type="number"
    size="lg"
    placeholder="Years of Experience"
    className="!border !border-gray-300"
  />
  {errors.exp && (
    <p className="text-red-500 text-sm mt-1">
      {errors.exp.message}
    </p>
  )}
</div>


          {/* Description Field */}
          <div className="mb-4">
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
              placeholder="Brief Description"
              className="!border !border-gray-300"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Time Slots Fields */}
          <div className="mb-4">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Time Slots
            </Typography>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 border p-4 rounded">
                <div className="mb-2">
                  <label htmlFor={`timeSlots[${index}].day`}>
                    <Typography
                      variant="small"
                      className="block font-medium text-gray-900"
                    >
                      Day
                    </Typography>
                  </label>
                  <Input
                    {...register(`timeSlots.${index}.day` as const)}
                    type="text"
                    size="lg"
                    placeholder="Day"
                    className="!border !border-gray-300"
                  />
                  {errors.timeSlots?.[index]?.day && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.timeSlots[index].day?.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor={`timeSlots[${index}].startTime`}>
                    <Typography
                      variant="small"
                      className="block font-medium text-gray-900"
                    >
                      Start Time
                    </Typography>
                  </label>
                  <Input
                    {...register(`timeSlots.${index}.startTime` as const)}
                    type="time"
                    size="lg"
                    className="!border !border-gray-300"
                  />
                  {errors.timeSlots?.[index]?.startTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.timeSlots[index].startTime?.message}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor={`timeSlots[${index}].endTime`}>
                    <Typography
                      variant="small"
                      className="block font-medium text-gray-900"
                    >
                      End Time
                    </Typography>
                  </label>
                  <Input
                    {...register(`timeSlots.${index}.endTime` as const)}
                    type="time"
                    size="lg"
                    className="!border !border-gray-300"
                  />
                  {errors.timeSlots?.[index]?.endTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.timeSlots[index].endTime?.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  color="red"
                  onClick={() => remove(index)}
                >
                  Remove Time Slot
                </Button>
              </div>
            ))}
            <Button
              type="button"
              color="blue"
              onClick={() => append({ day: "", startTime: "", endTime: "" })}
            >
              Add Time Slot
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            color="black"
            className="w-full mt-8 mb-4"
            type="submit"
          >
            Add Doctor
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AddDoctor;
