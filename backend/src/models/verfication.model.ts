import mongoose, { Schema } from "mongoose";
import { Verification } from "../types";

const verficationSchema = new Schema<Verification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

const verficationModel = mongoose.model<Verification>(
  "Verification",
  verficationSchema
);

export default verficationModel;
