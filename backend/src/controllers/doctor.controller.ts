import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

const getAllDoctors = async (req: Request, res: Response) => {
  const doctors = await UserModel.find({ role: "doctor" }).select("-password"); // Exclude the password field

  // Respond with the list of doctors
  res.status(200).json({
    message: "Doctors fetched successfully.",
    data: doctors,
  });
};
const doctorController = {
  getAllDoctors,
};
export default doctorController;
