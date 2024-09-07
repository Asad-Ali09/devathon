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
  .post(authMiddleware, authControllers.verifyUser);

router.route("/").post(authControllers.login).get(authControllers.logout);

router.route("isloggedin").get(authControllers.isLoggedIn);

export default router;
