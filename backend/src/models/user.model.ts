import mongoose, { mongo, Schema } from "mongoose";
import { Doctor, User } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenType } from "../types/authTypes";
import { jwtConfig } from "../config";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid user name"],
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    contact: {
      type: String,
      required: [true, "Please provide a valid contact number"],
      match: [/^\d{11}$/, "Please provide a valid 11 digit contact number"],
    },
    address: {
      type: String,
      required: [true, "Please provide a valid address"],
    },
    image: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
    },
    dob: {
      type: Date,
      required: [true, "Please provide a valid date of birth"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please provide gender"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["patient", "admin", "doctor"],
      default: "patient",
    },
  },
  {
    timestamps: true,
  }
);

const DoctorSchema: Schema<Doctor> = new mongoose.Schema({
  exp: {
    type: Number,
    required: true,
  },
  specializations: { type: [String], required: true },
  timeSlots: [
    {
      day: { type: String, required: true },
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
  description: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  const payload: TokenType = {
    userID: this._id,
    email: this.email,
  };
  return jwt.sign(payload, jwtConfig.secret!, {
    expiresIn: jwtConfig.expiresIn!,
  });
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<User>("User", UserSchema);

const DoctorModel = UserModel.discriminator<Doctor>("Doctor", DoctorSchema);

// export default UserModel;

export { DoctorModel, UserModel };
