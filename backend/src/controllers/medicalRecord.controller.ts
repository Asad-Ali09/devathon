import { Request, Response } from "express";
import customError from "../utils/customError";
import MedicalRecordModel from "../models/medicalRecord.model";

const uploadMedicalRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const doctorId = req.user._id;
  const { patientId, prescriptions, testResults } = req.body;

  // Validate and ensure patientId is provided
  if (!patientId) {
    throw new customError(400, "Patient ID is required");
  }
  const existingRecord = await MedicalRecordModel.findOne({
    patient: patientId,
    doctor: doctorId,
  });
  if (existingRecord) {
    throw new customError(
      400,
      "Medical record already exists for this patient"
    );
  }

  // Create a new medical record entry
  const newRecord = new MedicalRecordModel({
    patient: patientId,
    doctor: doctorId,
    imageUrls:
      // @ts-ignore
      req.files?.images.map((file: Express.Multer.File) => file.path) || [],
    testResults: testResults || [],
    prescriptions: prescriptions || [],
  });

  // Save the record to the database
  await newRecord.save();

  return res
    .status(201)
    .json({ message: "Medical record uploaded successfully", data: newRecord });
};

const getMedicalRecords = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const patientId = req.params.patientId; // Patient ID from route parameters
  const doctorId = req.user._id;
  if (!patientId) {
    throw new customError(400, "Patient ID is required");
  }

  // Find medical records for the patient
  const records = await MedicalRecordModel.find({
    patient: patientId,
    doctor: doctorId,
  }).exec();
  return res.status(200).json({ records });
};

const medicalControllers = {
  uploadMedicalRecord,
  getMedicalRecords,
};
export default medicalControllers;
