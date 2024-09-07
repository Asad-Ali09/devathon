import mongoose, { Schema } from "mongoose";
import { MedicalRecord } from "../types";

const medicalRecordSchema = new Schema<MedicalRecord>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming User model is used for patients
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming User model is used for doctors
      required: true,
    },
    imageUrls: [
      {
        type: String,
        required: false,
      },
    ],
    testResults: [
      {
        type: String,
        required: false,
      },
    ],
    prescriptions: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const MedicalRecordModel = mongoose.model<MedicalRecord>(
  "MedicalRecord",
  medicalRecordSchema
);

export default MedicalRecordModel;
