import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  isVerified: boolean;
  role: "user" | "admin";
  password?: string;
  isGoogleAccount?: boolean;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface Verification extends Document {
  userId: Schema.Types.ObjectId;
  code: string;
  createdAt: Date;
}
