import { Router } from "express";
import appointmentControllers from "../controllers/appointment.controller";
import authMiddleware, { roleMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router
  .route("/")
  .post(
    authMiddleware,
    roleMiddleware(["patient"]),
    appointmentControllers.bookAppointment
  )
  .get(
    authMiddleware,
    roleMiddleware(["patient", "doctor"]),
    appointmentControllers.getMyAppointments
  );

export default router;
