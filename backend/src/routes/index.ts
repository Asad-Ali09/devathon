import { Router } from "express";
import authRoutes from "./auth.routes";
import doctorRouter from "./doctor.routes";
import appointmentRouter from "./appointment.routes";
import medicalRecordRouter from "./medical.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/doctor", doctorRouter);
router.use("/appointment", appointmentRouter);
router.use("/medicalrecord", medicalRecordRouter);
export default router;
