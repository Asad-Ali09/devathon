import { Router } from "express";
import doctorController from "../controllers/doctor.controller";
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

router.route("/").get(authMiddleware, doctorController.getAllDoctors);

export default router;
