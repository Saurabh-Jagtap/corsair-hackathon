import { Router } from "express";
import { connectController } from "../controllers/connect.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router: Router = Router();

router.get("/", authMiddleware, connectController);

export default router;