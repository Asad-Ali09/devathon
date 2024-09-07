// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Typography, Input, Button } from "@material-tailwind/react";
// import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
// import { User } from "../Types/index";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// // Zod schema for doctor form validation
// const doctorSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters long"),
//   dob: z.string().min(1, "DOB is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
//   contactNumber: z.string().min(10, "Invalid contact number"),
//   address: z.string().min(1, "Address is required"),
//   gender: z.string().min(1, "Gender is required"),
//   experience: z.string().min(1, "Experience is required"),
//   timing: z.string().min(1, "Timing is required"),
//   qualification: z.string().min(1, "Qualification is required"),
//   specialization: z.string().min(1, "Specialization is required"),
// });

// export function dashboardAdmin() {
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const navigate = useNavigate();
//   const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<User>({
//     resolver: zodResolver(doctorSchema),
//   });

//   const onSubmit = async (data: User) => {
//     const toastId = toast.loading("Registering doctor...");

//     try {
//       const dataWithImage: User = {
//         ...data,
//         image: image,
//       };
//       await mutation.mutateAsync(dataWithImage);
//       toast.success("Doctor registered successfully", { id: toastId });
//     } catch (error: any) {
//       toast.error("Error registering doctor", { id: toastId });
//     }
//   };

//   // Regular registration mutation
//   const mutation = useMutation({
//     mutationFn: signUpCall,
//     onSuccess: () => {
//       console.log("Doctor registered successfully");
//       navigate("/dashboard");
//     },
//     onError: () => {
//       console.log("Error registering doctor");
//     },
//   });

//   return (
//     <section className="grid text-center h-screen items-center p-8">
//       <div>
//         <Typography variant="h3" color="blue-gray" className="mb-2">
//           Doctor Registration
//         </Typography>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mx-auto max-w-[24rem] text-left"
//         >
//           {/* Name Field */}
//           <div className="mb-2">
//             <label htmlFor="name">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Name
//               </Typography>
//             </label>
//             <Input
//               {...register("name")}
//               type="text"
//               size="lg"
//               placeholder="Doctor's Name"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//           </div>

//           {/* Date of Birth Field */}
//           <div className="mb-2">
//             <label htmlFor="dob">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Date of Birth
//               </Typography>
//             </label>
//             <Input
//               {...register("dob")}
//               type="date"
//               size="lg"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
//           </div>

//           {/* Email Field */}
//           <div className="mb-2">
//             <label htmlFor="email">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Email
//               </Typography>
//             </label>
//             <Input
//               {...register("email")}
//               type="email"
//               size="lg"
//               placeholder="Email Address"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//           </div>

//           {/* Password Field */}
//           <div className="mb-2">
//             <label htmlFor="password">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Password
//               </Typography>
//             </label>
//             <Input
//               {...register("password")}
//               size="lg"
//               placeholder="********"
//               type={passwordShown ? "text" : "password"}
//               className="!border !border-gray-300 bg-white"
//               icon={
//                 <i onClick={togglePasswordVisibility}>
//                   {passwordShown ? (
//                     <EyeIcon className="h-5 w-5" />
//                   ) : (
//                     <EyeSlashIcon className="h-5 w-5" />
//                   )}
//                 </i>
//               }
//             />
//             {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//           </div>

//           {/* Contact Number Field */}
//           <div className="mb-2">
//             <label htmlFor="contactNumber">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Contact Number
//               </Typography>
//             </label>
//             <Input
//               {...register("contactNumber")}
//               type="tel"
//               size="lg"
//               placeholder="Contact Number"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
//           </div>

//           {/* Address Field */}
//           <div className="mb-2">
//             <label htmlFor="address">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Address
//               </Typography>
//             </label>
//             <Input
//               {...register("address")}
//               type="text"
//               size="lg"
//               placeholder="Address"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.address && <p className="text-red-500">{errors.address.message}</p>}
//           </div>

//           {/* Gender Field */}
//           <div className="mb-2">
//             <label htmlFor="gender">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Gender
//               </Typography>
//             </label>
//             <Input
//               {...register("gender")}
//               type="text"
//               size="lg"
//               placeholder="Gender"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
//           </div>

//           {/* Experience Field */}
//           <div className="mb-2">
//             <label htmlFor="experience">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Experience
//               </Typography>
//             </label>
//             <Input
//               {...register("experience")}
//               type="text"
//               size="lg"
//               placeholder="Experience"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
//           </div>

//           {/* Timing Field */}
//           <div className="mb-2">
//             <label htmlFor="timing">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Timing (Appointment)
//               </Typography>
//             </label>
//             <Input
//               {...register("timing")}
//               type="text"
//               size="lg"
//               placeholder="Appointment Timing"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.timing && <p className="text-red-500">{errors.timing.message}</p>}
//           </div>

//           {/* Qualification Field */}
//           <div className="mb-2">
//             <label htmlFor="qualification">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Qualification
//               </Typography>
//             </label>
//             <Input
//               {...register("qualification")}
//               type="text"
//               size="lg"
//               placeholder="Qualification"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.qualification && <p className="text-red-500">{errors.qualification.message}</p>}
//           </div>

//           {/* Specialization Field */}
//           <div className="mb-2">
//             <label htmlFor="specialization">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Specialization
//               </Typography>
//             </label>
//             <Input
//               {...register("specialization")}
//               type="text"
//               size="lg"
//               placeholder="Specialization"
//               className="!border !border-gray-300 bg-white"
//             />
//             {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}
//           </div>

//           {/* Image Upload Field */}
//           <div className="mb-2">
//             <label htmlFor="image">
//               <Typography
//                 variant="small"
//                 className="mb-2 block font-medium text-gray-900"
//               >
//                 Add Your Image
//               </Typography>
//             </label>
//             <Input
//               type="file"
//               size="lg"
//               className="!border !border-gray-300 bg-white"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//             />
//           </div>

//           <Button
//             color="gray"
//             size="lg"
//             className="mt-4"
//             fullWidth
//             type="submit"
//           >
//             Register
//           </Button>

//           <Typography
//             variant="small"
//             color="gray"
//             className="!mt-4 text-center font-normal"
//           >
//             Already registered?{" "}
//             <Link to={"/login"} className="font-medium text-gray-900">
//               Login
//             </Link>
//           </Typography>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default dashboardAdmin;
