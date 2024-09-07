import { Router } from "express";
import authControllers from "../controllers/auth.controller";
import authMiddleware, {
  authMiddlewareForVerification,
} from "../middlewares/authMiddleware";
const router = Router();

router.route("/signup").post(authControllers.signUp);
router
  .route("/verify")
  .get(
    authMiddlewareForVerification,
    authControllers.requestNewVerificationCode
  )
  .post(authMiddlewareForVerification, authControllers.verifyUser);

router.route("/").post(authControllers.login).get(authControllers.logout);

router.route("/isloggedin").get(authControllers.isLoggedIn);

router.route("/registerdoctor").post(authControllers.registerDoctor);

export default router;
