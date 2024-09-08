import { Request, Response, Router } from "express";
import authRoutes from "./auth.routes";
import doctorRouter from "./doctor.routes";
import appointmentRouter from "./appointment.routes";
import medicalRecordRouter from "./medical.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/doctor", doctorRouter);
router.use("/appointment", appointmentRouter);
router.use("/medicalrecord", medicalRecordRouter);

router.get("/image/:filename", (req: Request, res: Response) => {
  const filename = req.params.filename;
  const imageUrl = `/uploads/${filename}`;
  res.json({ url: imageUrl });
});

export default router;
