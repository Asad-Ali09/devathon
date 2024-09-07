import { Router } from "express";
import appointmentControllers from "../controllers/appointment.controller";
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

router.route("/").post(authMiddleware, appointmentControllers.bookAppointment);

export default router;
