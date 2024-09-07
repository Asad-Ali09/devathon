import { Request, Response } from "express";
import customError from "../utils/customError";
import { UserModel } from "../models/user.model";
import { Doctor } from "../types";
import AppointmentModel from "../models/appointment.model";
import { BookAppointmentRequest } from "../types/appointmentTypes";

const isDoctorAvailable = (
  doctor: Doctor,
  appointmentDate: Date,
  appointmentStartTime: Date,
  appointmentEndTime: Date
): boolean => {
  // Get the day of the week from the appointment date
  const appointmentDay = appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Check if the doctor has a time slot for the given day
  const availableSlotsForDay = doctor.timeSlots.filter(
    (slot) => slot.day === appointmentDay
  );

  // Check if the appointment time fits within any of the available slots for the day
  return availableSlotsForDay.some((slot) => {
    // Create Date objects for the slot's start and end times on the appointment date
    const slotStartTime = new Date(
      `${appointmentDate.toISOString().split("T")[0]}T${
        slot.startTime.toISOString().split("T")[1]
      }`
    );
    const slotEndTime = new Date(
      `${appointmentDate.toISOString().split("T")[0]}T${
        slot.endTime.toISOString().split("T")[1]
      }`
    );

    console.log({
      slotStartTime,
      slotEndTime,
      appointmentStartTime,
      appointmentEndTime,
    });

    // Check if the appointment time falls within the slot
    return (
      appointmentStartTime >= slotStartTime && appointmentEndTime <= slotEndTime
    );
  });
};

const bookAppointment = async (
  req: Request<{}, {}, BookAppointmentRequest>,
  res: Response
) => {
  const user = req.user;
  const patientId = user._id;

  const { doctorId } = req.body;
  if (!req.body.timeSlot) {
    throw new customError(400, "Please provide all required fields.");
  }
  const { date, startTime, endTime } = req.body.timeSlot;
  // Validate input
  if (!doctorId || !patientId || !date || !startTime || !endTime) {
    throw new customError(400, "Please provide all required fields.");
  }

  // Validate and parse dates
  const appointmentDate = new Date(date);
  const appointmentStartTime = new Date(startTime);
  const appointmentEndTime = new Date(endTime);

  if (appointmentStartTime >= appointmentEndTime) {
    throw new customError(400, "End time must be after start time.");
  }

  if (appointmentDate <= new Date()) {
    throw new customError(400, "Appointment date must be in the future.");
  }

  // Check if the doctor and patient exist
  const doctor = (await UserModel.findById(doctorId)) as Doctor;

  if (!doctor || doctor.role !== "doctor") {
    throw new customError(404, "Doctor not found.");
  }

  if (
    !isDoctorAvailable(
      doctor,
      appointmentDate,
      appointmentStartTime,
      appointmentEndTime
    )
  ) {
    throw new customError(400, "Doctor is not available at the selected time.");
  }

  // Check for existing appointments for the doctor
  const existingAppointments = await AppointmentModel.find({
    doctor: doctorId,
    $or: [
      {
        "timeSlot.startTime": { $lt: appointmentEndTime },
        "timeSlot.endTime": { $gt: appointmentStartTime },
      },
      {
        "timeSlot.endTime": { $gt: appointmentStartTime },
        "timeSlot.startTime": { $lt: appointmentEndTime },
      },
    ],
  });

  if (existingAppointments.length > 0) {
    throw new customError(
      400,
      "Doctor already has an appointment during this time slot."
    );
  }

  // Create a new appointment
  const newAppointment = new AppointmentModel({
    doctor: doctorId,
    patient: patientId,
    timeSlot: {
      date: appointmentDate,
      startTime: appointmentStartTime,
      endTime: appointmentEndTime,
    },
  });

  await newAppointment.save();

  res.status(201).json({
    message: "Appointment booked successfully.",
    data: newAppointment,
  });
};

const appointmentControllers = {
  bookAppointment,
};
export default appointmentControllers;
