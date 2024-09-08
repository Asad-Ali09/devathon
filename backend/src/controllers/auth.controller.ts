import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ClientSession } from "mongoose";
import { jwtConfig } from "../config";
import withTransaction from "../middlewares/transactionWrapper";
import { DoctorModel, UserModel } from "../models/user.model";
import verficationModel from "../models/verfication.model";
import {
  DoctorSignUpRequest,
  ManualLoginRequest,
  ManualSignUpRequest,
  TokenType,
} from "../types/authTypes";
import { cookieOptions, generate6DigitCode } from "../utils/auth.utils";
import customError from "../utils/customError";
import { sendSignupVerificationCodeMail } from "../utils/sendMail";

// const getGoogleAccountDetails = async (googleAccessToken: string) => {
//   const response = await axios.get<GoogleAuthResponse>(
//     "https://www.googleapis.com/oauth2/v3/userinfo",
//     {
//       headers: {
//         Authorization: `Bearer ${googleAccessToken}`,
//       },
//     }
//   );

//   return {
//     name: `${response.data.given_name} ${response.data.family_name}`,
//     email: response.data.email,
//   };
// };

// type SignUpRequestType =
//   | Request<{}, {}, ManualSignUpRequest>
//   | Request<{}, {}, GoogleSignUpLoginRequest>;

// const isGoogleSignUpRequest = (
//   req: SignUpRequestType
// ): req is Request<{}, {}, GoogleSignUpLoginRequest> => {
//   return "googleAccessToken" in req.body;
// };

const signUp = withTransaction(
  async (
    req: Request<{}, {}, ManualSignUpRequest>,
    res: Response,
    session: ClientSession
  ) => {
    // let name = "",
    //   email = "",
    //   password = "";
    // if (isGoogleSignUpRequest(req)) {
    //   const userDetails = await getGoogleAccountDetails(
    //     req.body.googleAccessToken
    //   );
    //   name = userDetails.name;
    //   email = userDetails.email;
    // } else {
    //   name = req.body.name;
    //   email = req.body.email;
    //   password = req.body.password;
    //   if (!name || !email || !password)
    //     throw new customError(400, "Invalid email or password");
    // }

    const { name, email, address, contactNumber, dob, gender, password } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !contactNumber ||
      !dob ||
      !address ||
      !gender
    ) {
      throw new customError(400, "Please provide all required fields");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new customError(400, "User already exists");
    }

    let newPatient = new UserModel({
      name,
      email,
      password,
      contact: contactNumber,
      address,
      gender,
      dob,
      isVerified: false,
      role: "patient",
    });

    await newPatient.save({ session });

    const token = await newPatient.createJWT();

    res.cookie("token", token, cookieOptions);

    // if (isGoogleSignUpRequest(req)) {
    //   return res.status(201).json({
    //     message: "Please Check you email for verification code",
    //     data: { name, email },
    //   });
    // }

    // Generate a verification code
    const verificationCode = generate6DigitCode();

    // Save the verification code to the DB
    const newVerificationCode = new verficationModel({
      userId: newPatient._id,
      code: verificationCode,
    });
    await newVerificationCode.save({ session });

    // Send verification email
    const isMailSent = await sendSignupVerificationCodeMail(
      email,
      verificationCode
    );
    const { password: hashedPassword, ...responseUser } = newPatient.toObject();

    // Respond to the client
    if (isMailSent === true)
      return res.status(200).json({
        message: "Please Check you email for verification code",
        data: responseUser,
      });
    else throw new customError(500, "Error sending verification code");
  }
);

const requestNewVerificationCode = async (req: Request, res: Response) => {
  if (!req.user) throw new customError(401, "Unauthenticated. Please Login..");
  // Generate 6 digit verification code
  const email = req.user?.email || "";
  const verificationCode = generate6DigitCode();

  // Delete the previously stored verification code
  await verficationModel.deleteOne({ userId: req.user?._id });

  // Save the new verification code to the DB
  const newVerificationCode = new verficationModel({
    userId: req.user?._id,
    code: verificationCode,
  });
  await newVerificationCode.save();

  // Send Mail. TODO: create email template
  const isMailSent = await sendSignupVerificationCodeMail(
    email,
    verificationCode
  );

  if (isMailSent === true)
    res.status(200).json({ message: "Verification code sent" });
  else res.status(200).json({ message: "Error sending verification code" });
};

const verifyUser = async (
  req: Request<{}, {}, { code: number }>,
  res: Response
) => {
  const { code } = req.body;

  if (!code) throw new customError(400, "Invalid Verification Code");

  const verification = await verficationModel.findOne({
    userId: req.user?._id,
    code,
  });
  if (!verification) throw new customError(400, "Invalid Verification Code");

  // Update the user as verified
  await UserModel.updateOne({ _id: req.user?._id }, { isVerified: true });

  verification.deleteOne();

  return res.send({ message: "user verified" });
};

const login = async (
  req: Request<{}, {}, ManualLoginRequest>,
  res: Response
) => {
  // let email = "",
  //   password = "";
  // if ("googleAccessToken" in req.body) {
  //   const userDetails = await getGoogleAccountDetails(
  //     req.body.googleAccessToken
  //   );
  //   email = userDetails.email;
  // } else {
  //   email = req.body.email;
  //   password = req.body.password;
  //   if (!password || !email) {
  //     throw new customError(400, "Invalid Credentials");
  //   }
  // }

  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    throw new customError(400, "Please provide email and password");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new customError(401, "Invalid credentials");
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new customError(400, "Invalid Credentials");
  }
  // if (!("googleAccessToken" in req.body)) {
  // }

  const token = user.createJWT();
  res.cookie("token", token, cookieOptions);

  const { password: hashedPassword, ...responseUser } = user.toObject();

  res
    .status(200)
    .json({ message: "Logged In Successfully", data: responseUser });
};

const logout = async (_: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged Out Successfully" });
};

const isLoggedIn = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token || typeof token !== "string") {
    return res.status(200).json(false);
  }

  const decodedToken = (await jwt.verify(token, jwtConfig.secret)) as TokenType;
  if (!decodedToken) {
    return res.status(200).json(false);
  }
  const user = await UserModel.findById(decodedToken.userID);
  if (!user) return res.status(200).json(false);
  const { password, ...responseUser } = user.toObject();
  return res.status(200).json(responseUser);
};

const registerDoctor = async (
  req: Request<{}, {}, DoctorSignUpRequest>,
  res: Response
) => {
  const {
    name,
    email,
    password,
    contactNumber,
    address,
    dob,
    gender,
    specializations,
    exp,
    description,
    timeSlots,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !password ||
    !contactNumber ||
    !dob ||
    !address ||
    !gender ||
    !specializations ||
    !exp ||
    !description ||
    !timeSlots
  ) {
    throw new customError(400, "Please provide all required fields");
  }

  // Check if the doctor already exists by email
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new customError(400, "User with this email already exists");
  }

  // Create a new doctor instance
  const newDoctor = new DoctorModel({
    name,
    email,
    password,
    contact: contactNumber,
    address,
    dob,
    gender,
    isVerified: true,
    role: "doctor", // Set role as doctor
    specializations,
    exp,
    description,
    timeSlots,
  });

  // Save the new doctor in the database
  await newDoctor.save();

  // Generate JWT token
  const token = await newDoctor.createJWT();

  // Set the JWT token as a cookie
  res.cookie("token", token, cookieOptions);

  let { password: hashedPassword, ...responseUser } = newDoctor.toObject();

  return res
    .status(201)
    .json({ message: "Doctor registered successfully", user: responseUser });
};

export const createAdminAccount = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

  if (!adminEmail || !adminPassword) {
    throw new customError(
      500,
      "Admin email or password is not defined in environment variables."
    );
  }

  const existingAdmin = await UserModel.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log("Admin account already exists.");
    return;
  }

  const newAdmin = new UserModel({
    name: "Admin",
    email: adminEmail,
    password: adminPassword,
    contact: "12345678901",
    address: "Admin Office",
    gender: "other",
    isVerified: true,
    role: "admin",
    dob: new Date(),
  });

  await newAdmin.save();
  console.log("Admin account created successfully.");
};
createAdminAccount();
const authControllers = {
  signUp,
  requestNewVerificationCode,
  verifyUser,
  login,
  logout,
  isLoggedIn,
  registerDoctor,
};
export default authControllers;
