import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure routes

router.route("/logout").post(authMiddleware, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
