import { Router } from "express";
import { assistantChat } from "../controllers/assistant.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/chat",authMiddleware, assistantChat);

export default router;