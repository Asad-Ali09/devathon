import mongoose, { Schema } from "mongoose";
import { Appointment } from "../types";

const appointmentSchema = new Schema<Appointment>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the User model for the doctor
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the patient
      required: true,
    },
    timeSlot: {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model<Appointment>(
  "Appointment",
  appointmentSchema
);

export default AppointmentModel;
