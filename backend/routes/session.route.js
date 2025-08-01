import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraftSession,
  publishSession,
} from "../controllers/session.controller.js";

const router = Router();

router.route("/sessions").get(getPublicSessions);
router.route("/my-sessions").get(authMiddleware, getMySessions);
router.route("/my-sessions/:id").get(authMiddleware, getSessionById);
router.post("/my-sessions/save-draft", authMiddleware, saveDraftSession);
router.post("/my-sessions/publish", authMiddleware, publishSession);

export default router;
