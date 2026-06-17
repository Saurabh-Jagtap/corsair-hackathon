import { Router } from "express";
import { authController } from "../controllers/auth.controllers.js";

const router: Router = Router();

router.get("/", authController);

export default router;