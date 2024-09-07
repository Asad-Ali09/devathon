import { Router } from "express";
import { upload } from "../utils/upload";
import medicalControllers from "../controllers/medicalRecord.controller";
import authMiddleware, { roleMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["doctor"]),
  upload.fields([{ name: "images", maxCount: 10 }]),
  medicalControllers.uploadMedicalRecord
);

router.get(
  "/:patientId",
  authMiddleware,
  roleMiddleware(["doctor"]),
  medicalControllers.getMedicalRecords
);

export default router;
