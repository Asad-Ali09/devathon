import { Document, Schema } from "mongoose";

export type Role = "patient" | "admin" | "doctor";
export type Gender = "male" | "female" | "other";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  image: string;
  dob: Date;
  gender: Gender;
  isVerified: boolean;
  role: Role;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface Doctor extends User {
  exp: number;
  specializations: string[];
  timeSlots: {
    day: string;
    startTime: Date;
    endTime: Date;
  }[];
  description: string;
}

export interface Patient extends User {}

export interface Admin extends User {}

export interface Verification extends Document {
  userId: Schema.Types.ObjectId;
  code: string;
  createdAt: Date;
}

export interface Appointment extends Document {
  doctor: Schema.Types.ObjectId;
  patient: Schema.Types.ObjectId;
  timeSlot: {
    date: Date;
    startTime: Date; // Start time of the appointment
    endTime: Date; // End time of the appointment
  };
}
